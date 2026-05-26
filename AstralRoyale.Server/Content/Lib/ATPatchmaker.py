import os
import hashlib
import json
import datetime
import random
import shutil
from LZMA import compress

directory1 = os.path.dirname(os.path.abspath(__file__)) 
directory2 = os.path.abspath(os.path.join(directory1, "../")) 
directory3 = os.path.abspath(os.path.join(directory2, "../")) 
directory4 = os.path.join(directory3, "config.json")
config = json.load(open(directory4, "r"))

def _(*args):
    print('[INFO]', end=' ')
    for arg in args:
        print(arg, end=' ')
    print()


def Make():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    server_root = os.path.abspath(os.path.join(script_dir, "../../"))
    gamefiles_path = os.path.join(server_root, "Gamefiles")

    update_path = os.path.join(gamefiles_path, "update")
    os.makedirs(update_path, exist_ok=True)

    def FP(arg: str) -> str:
        return arg.replace("\\", "/").replace(gamefiles_path.replace("\\", "/") + "/", "")

    def iterate_over(path: str) -> list:
        r = []
        for root, dirs, files in os.walk(path, topdown=False):
            for name in files:
                if name != 'fingerprint.json':
                    r.append(os.path.join(root, name))
        return r

    def shash(inp) -> str:
        hash_object = hashlib.sha1(inp)
        return hash_object.hexdigest()

    def MasterHasher():
        time = str(int(datetime.datetime.timestamp(datetime.datetime.now())))
        return shash(time.encode())

    MH = MasterHasher()

    base = '''{ "files": [],
      "sha": "''' + MH + '",' + '''
      "version": "''' + "3.830." + str(random.randint(1, 9)) + '"}'

    out = json.loads(base)

    _(f'MasterHash is {MH}\n')
    config['Server']['Fingerprint'] = MH
    with open(directory4, "w") as f:
        json.dump(config, f, indent=4)    

    all_file = iterate_over(gamefiles_path)

    for file in all_file:
        if "/update/" in file.replace("\\", "/"):
            continue

        _(f'Processing {file} ...')

        with open(file, "rb") as f:
            content = f.read()

        if file.endswith('.csv'):
            content = compress(content)

        sha = shash(content)
        out["files"].append({
            "file": FP(file),
            "sha": sha
        })

    hash_folder = os.path.join(update_path, MH)

    def ignore_update(folder, files):
        return ['update'] if folder == gamefiles_path else []

    shutil.copytree(gamefiles_path, hash_folder, dirs_exist_ok=True, ignore=ignore_update)

    all_file = iterate_over(hash_folder)

    for file in all_file:
        if "/update/" in file.replace("\\", "/"):
            continue

        if file.endswith('.csv'):
            with open(file, "rb") as f:
                content = f.read()

            compressed = compress(content)

            with open(file, "wb") as f:
                f.write(compressed)
        else:
            _(f"Skipping compression for {file}")

    json_path = os.path.join(hash_folder, "fingerprint.json")
    with open(json_path, "w") as json_out:
        json_out.write(
            json.dumps(out, indent=4)
        )