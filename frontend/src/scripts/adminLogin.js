// frontend/src/scripts/adminLogin.js

export const handleLogin = async (e, navigate) => {
    e.preventDefault();
    const form = e.target;

    const password = form.querySelector("#admin-password")?.value;
    console.log(password);

    navigate("/admin");

    return null;
}