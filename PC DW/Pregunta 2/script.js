document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');
    const imageUpload = document.getElementById('imageUpload');
    const descriptionFields = document.getElementById('descriptionFields');
    const imageGallery = document.getElementById('imageGallery');

    imageUpload.addEventListener('change', () => {
        descriptionFields.innerHTML = '';
        for (let i = 0; i < imageUpload.files.length; i++) {
            descriptionFields.innerHTML += `
                <div class="mb-3">
                    <label for="desc${i}" class="form-label">Descripción para ${imageUpload.files[i].name}</label>
                    <input type="text" class="form-control" id="desc${i}" required>
                </div>
            `;
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        for (let i = 0; i < imageUpload.files.length; i++) {
            const file = imageUpload.files[i];
            const description = document.getElementById(`desc${i}`).value;
            const reader = new FileReader();

            reader.onload = (event) => {
                const now = new Date();
                const dateTime = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

                const imageContainer = document.createElement('div');
                imageContainer.className = 'col-md-4 image-container';
                imageContainer.innerHTML = `
                    <img src="${event.target.result}" class="img-fluid" alt="${file.name}">
                    <div class="image-info">
                        <p>${description}</p>
                        <small>${dateTime}</small>
                    </div>
                `;
                imageGallery.prepend(imageContainer);
            };

            reader.readAsDataURL(file);
        }
        form.reset();
        descriptionFields.innerHTML = '';
    });
});