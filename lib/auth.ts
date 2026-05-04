'use server'
// TODO: Add Database functionality.
export async function login(formData: FormData) {
    const email = formData.get("email");
    const pwd = formData.get("password");
    console.log("Logging In:", email, pwd);
    return;
}

export async function signup(formData: FormData) {
    const email = formData.get("email");
    const pwd = formData.get("password");
    console.log("Signining Up:", email, pwd);
    return;
}