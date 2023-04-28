const createFormHandler = async (event) => {
  event.preventDefault();
  console.log("click");
  // Collect values from the create form
  const title = document.getElementById("create-title").value.trim();
  const description = document
    .getElementById("create-description")
    .value.trim();

  if (title && description) {
    // Send a POST request to the API endpoint with the new post data
    const response = await fetch(`api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(response);
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

// Get the create form element
const createForm = document.getElementById("createPost");
console.log(createForm);

// Add an event listener to the form for a submission event
createForm.addEventListener("click", createFormHandler);
