import json
import os

def create_structure(structure, parent_path="."):
    for item, content in structure.items():
        if item == "files":
            for file in content:
                file_path = os.path.join(parent_path, file)
                if not os.path.exists(file_path):
                    with open(file_path, 'w') as f:
                        pass  # Create an empty file
                    print(f"Created file: {file_path}")
                else:
                    print(f"File already exists (skipped): {file_path}")
        elif item == "directories":
            for dir_name, dir_content in content.items():
                dir_path = os.path.join(parent_path, dir_name)
                if not os.path.exists(dir_path):
                    os.makedirs(dir_path)
                    print(f"Created directory: {dir_path}")
                else:
                    print(f"Directory already exists: {dir_path}")
                create_structure(dir_content, dir_path)

def main():
    try:
        with open("structure.json", "r") as f:
            structure_data = json.load(f)
    except FileNotFoundError:
        print("Error: structure.json file not found.")
        return
    except json.JSONDecodeError:
        print("Error: Invalid JSON in structure.json file.")
        return

    create_structure(structure_data)
    print("Project structure creation completed.")

if __name__ == "__main__":
    main()