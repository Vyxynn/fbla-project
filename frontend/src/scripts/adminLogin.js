// frontend/src/scripts/adminLogin.js

export const handleLogin = async (e, navigate) => {
  e.preventDefault();
  const form = e.target;

  const password = form.querySelector("#admin-password")?.value;

  try {
    const response = await fetch("http://localhost:3000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    // Debug: log the response
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers.get("content-type"));

    // Get the raw text first
    const text = await response.text();
    console.log("Response text:", text);

    // Try to parse it as JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      alert("Server error. Check console for details.");
      return null;
    }

    if (data.success && data.token) {
      sessionStorage.setItem("adminToken", data.token);
      console.log("Login successful");
      navigate("/admin/home"); // Changed from "/" to "/admin/home"
    } else {
      console.log("Invalid password");
      alert("Invalid password");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Please try again.");
  }

  return null;
};
