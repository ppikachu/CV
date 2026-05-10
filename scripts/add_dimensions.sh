#!/bin/bash

# Loop through each image file in the directory
for file in *.{jpg,png}; do
    # Extract the filename and extension
    filename=$(basename "$file")
    extension="${filename##*.}"
    filename_no_ext="${filename%.*}"

    # Check if the filename already contains dimensions
    if [[ ! $filename_no_ext =~ [0-9]+x[0-9]+ ]]; then
        # Get the dimensions of the image
        dimensions=$(identify -format "%wx%h" "$file")

        # Rename the file to include the dimensions
        mv "$file" "${filename_no_ext}-${dimensions}.${extension}"
    fi
done