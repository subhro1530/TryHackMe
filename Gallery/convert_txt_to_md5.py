import hashlib

def compute_md5_hash(text):
    return hashlib.md5(text.encode()).hexdigest()

input_file_path = input("Enter the path to the input file: ")
output_file_path = input("Enter the path to the output file: ")

try:
    with open(input_file_path, 'r') as input_file:
        with open(output_file_path, 'w') as output_file:
            for line in input_file:
                line = line.strip()  # Remove leading/trailing whitespace and newline
                if line:
                    hash_value = compute_md5_hash(line)
                    output_file.write(hash_value + '\n')
    print("MD5 hashes have been generated and saved to", output_file_path)
except FileNotFoundError:
    print("Input file not found.")
except Exception as e:
    print("An error occurred:", str(e))
