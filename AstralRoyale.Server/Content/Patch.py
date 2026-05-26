import http.server
import socketserver
import socket
import os
import shutil
import Lib.ATPatchmaker as pm


def all_subdirs_of(b='.') -> list:
    result = []
    for d in os.listdir(b):
        bd = os.path.join(b, d)
        if os.path.isdir(bd):
            result.append(bd)
    return result


ip = "0.0.0.0"
port = 9340

current_path = os.getcwd()

gamefiles_path = os.path.join(current_path, "../Gamefiles")
update_path = os.path.join(gamefiles_path, "update")

print("Please wait until the patcher finishes running\n")

pm.Make()

print("\nPatching done!")

os.makedirs(update_path, exist_ok=True)

subdirs = all_subdirs_of(update_path)

if not subdirs:
    print(f"No hash folders found in {update_path}.")
    update_subfolders = os.listdir(update_path)
    if update_subfolders:
        patch_folder = os.path.join(update_path, update_subfolders[0])
    else:
        raise FileNotFoundError(f"No hash folder could be found or created in {update_path}")
else:
    patch_folder = max(subdirs, key=os.path.getctime)

latest_finger = os.path.join(patch_folder, "fingerprint.json")

parent = os.path.dirname(current_path)
gameassets_path = os.path.join(parent, "Gamefiles")

os.makedirs(gameassets_path, exist_ok=True)
shutil.copy(latest_finger, gameassets_path)

os.chdir(update_path)

handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer((ip, port), handler) as httpserver:
    host_name = socket.gethostname()
    host_ip = socket.gethostbyname(host_name)

    print(f"\nPatching HTTP server started at URL: http://{host_ip}:{port}/\n")
    print("Do not close this window and restart your AstralRoyale server for changes to take effect!")

    httpserver.serve_forever()