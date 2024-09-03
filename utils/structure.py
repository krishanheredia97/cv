import os
import pathlib
import fnmatch
import shutil
import json

def get_gitignore_patterns(root_path):
    gitignore_path = os.path.join(root_path, '.gitignore')
    if os.path.exists(gitignore_path):
        with open(gitignore_path, 'r') as f:
            return [line.strip() for line in f if line.strip() and not line.startswith('#')]
    return []

def should_ignore(path, ignore_patterns, always_ignore, custom_ignore):
    path = os.path.normpath(path)
    filename = os.path.basename(path)
    
    # Check for specific files and patterns
    if filename in ['structure.py', 'populator.py'] or filename.endswith('-workspace'):
        return True
    
    # Check custom ignore directories
    for custom_dir in custom_ignore:
        if custom_dir in path.split(os.sep):
            return True
    
    # Check other ignore patterns
    for pattern in ignore_patterns + always_ignore:
        if fnmatch.fnmatch(path, pattern):
            return True
    
    return False

def generate_directory_structure(startpath, ignore_patterns, always_ignore, custom_ignore):
    structure = {"files": [], "directories": {}}
    
    for item in os.listdir(startpath):
        item_path = os.path.join(startpath, item)
        if os.path.isfile(item_path) and not should_ignore(item_path, ignore_patterns, always_ignore, custom_ignore):
            structure["files"].append(item)
        elif os.path.isdir(item_path) and not should_ignore(item_path, ignore_patterns, always_ignore, custom_ignore):
            structure["directories"][item] = generate_directory_structure(item_path, ignore_patterns, always_ignore, custom_ignore)
    
    # Remove empty lists and dictionaries
    if not structure["files"]:
        del structure["files"]
    if not structure["directories"]:
        del structure["directories"]
    
    return structure

def copy_files(startpath, destination, ignore_patterns, always_ignore, custom_ignore):
    for root, dirs, files in os.walk(startpath):
        dirs[:] = [d for d in dirs if not should_ignore(os.path.join(root, d), ignore_patterns, always_ignore, custom_ignore)]
        files = [file for file in files if not should_ignore(os.path.join(root, file), ignore_patterns, always_ignore, custom_ignore)]
        
        for file in files:
            src_path = os.path.join(root, file)
            relative_path = os.path.relpath(root, startpath)
            if file == '__init__.py' or os.path.exists(os.path.join(destination, file)):
                # Rename the file to include its directory path
                new_filename = f"{relative_path.replace(os.sep, '-')}-{file}"
                new_filename = new_filename.lstrip('-')  # Remove leading dash if present
            else:
                new_filename = file
            
            # Skip files that would be renamed with "-project" in their name
            if not new_filename.startswith('project-'):
                dst_path = os.path.join(destination, new_filename)
                shutil.copy2(src_path, dst_path)

def clean_project_directory(project_dir):
    for item in os.listdir(project_dir):
        item_path = os.path.join(project_dir, item)
        if os.path.isfile(item_path) or os.path.islink(item_path):
            os.unlink(item_path)
        elif os.path.isdir(item_path):
            shutil.rmtree(item_path)

def get_custom_ignore():
    custom_input = input("Enter custom directories to exclude (comma-separated) or '0' for no custom exclusions: ").strip()
    if custom_input == '0':
        return []
    return [dir.strip() for dir in custom_input.split(',') if dir.strip()]

# Set the start path to the current directory
start_path = '.'
project_dir = 'project'
output_file = os.path.join(project_dir, 'structure.json')

# Get custom directories to ignore
custom_ignore = get_custom_ignore()

# Create the project directory if it doesn't exist
os.makedirs(project_dir, exist_ok=True)

# Clean the project directory
clean_project_directory(project_dir)

# Generate the directory structure
ignore_patterns = get_gitignore_patterns(start_path)
always_ignore = ['venv', '__pycache__', '.git', 'project']  # Add 'project' to always ignore
structure = generate_directory_structure(start_path, ignore_patterns, always_ignore, custom_ignore)

# Write the structure to a JSON file
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(structure, f, indent=4)

# Copy files to the project directory
copy_files(start_path, project_dir, ignore_patterns, always_ignore, custom_ignore)

print(f"Directory structure has been saved to {output_file}")
print(f"Files have been copied to {project_dir}")