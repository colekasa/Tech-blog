const updateFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update form
  const title = document.querySelector("#update-title").value.trim();
  const description = document
    .querySelector("#update-description")
    .value.trim();
  const postId = event.target.dataset.postId;

  if (title && description && postId) {
    // Send a PUT request to the API endpoint with the updated post data
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Reload the page to see the updated post
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

// Add event listener to all update buttons
const updateButtons = document.querySelectorAll(".update-button");
updateButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    // Get the post ID from the button's data-id attribute
    const postId = event.target.dataset.id;
    // Find the article element containing the post
    const article = event.target.closest("article");
    // Get the title and description elements
    const titleElement = article.querySelector("h3 a");
    const descriptionElement = article.querySelector("p");
    // Replace the title and description elements with input fields
    titleElement.outerHTML = `<input type="text" name="title" value="${titleElement.textContent}" />`;
    descriptionElement.outerHTML = `<textarea name="description">${descriptionElement.textContent}</textarea>`;
    // Replace the "Update" button with a "Save" button
    const updateButton = article.querySelector(".update-button");
    updateButton.outerHTML = `<button class="save-button" data-id="${postId}">Save</button>`;
    // Add event listener to the new "Save" button
    const saveButton = article.querySelector(".save-button");
    saveButton.addEventListener("click", function (event) {
      // Get the updated title and description values from the input fields
      const newTitle = article.querySelector('input[name="title"]').value;
      const newDescription = article.querySelector(
        'textarea[name="description"]'
      ).value;
      // Make a PUT request to update the post with the new values
      fetch(`api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify({ title: newTitle, description: newDescription }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          // If the update is successful, replace the input fields with the updated title and description
          if (response.ok) {
            titleElement.outerHTML = `<h3><a href="#">${newTitle}</a></h3>`;
            descriptionElement.outerHTML = `<p>${newDescription}</p>`;
            // Replace the "Save" button with the original "Update" button
            saveButton.outerHTML = `<button class="update-button" data-id="${postId}">Update</button>`;
          }
        })
        .catch((error) => console.error(error));
    });
  });
});
