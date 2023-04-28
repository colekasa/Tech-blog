const updateFormHandler = async (event) => {
  event.preventDefault();
  console.log(dataset.id);

  // Collect values from the update form
  const title = document.querySelector("#update-title").value.trim();
  const description = document
    .querySelector("#update-description")
    .value.trim();
  const postId = event.target.dataset.id;

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

// Get the update form element
const updateForm = document.querySelector("#update-form");

// Add an event listener to the form for a submission event
updateForm.addEventListener("submit", updateFormHandler);

//TODO: when i hit the update button on the dashboard how do i get the partial to populate?
