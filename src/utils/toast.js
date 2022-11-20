function fireToast(swal, success, msg, duration = 2000) {
    swal.fire({
        icon: success ? "success" : "error",
        title: msg,
        showConfirmButton: false,
        toast: true,
        position: "top",
        timer: duration,
    });
}

function logOutPopUpOptions() {
    return {
        title: "Logout",
        text: "Are you sure you want to logout?",
        confirmButtonText: "Yes",
        confirmButtonColor: "#6e7881",
        cancelButtonColor: "#D65A31",
        showCancelButton: true,
        focusCancel: true,
    };
}


async function textInputPopUp(swal, title, text, inputType = 'placeholder') {
    let opt = {
        title: title,
        input: 'text',
        showCancelButton: true,
        confirmButtonColor: "#D65A31",
        cancelButtonColor: "#6e7881"
    }

    if (inputType == 'current') {
        opt.inputValue = text;
    } else {
        opt.inputPlaceholder = text
    }

    const { value: email } = await swal.fire(opt)

    if (email) return email;

    return null;
}

export default { fireToast, logOutPopUpOptions, textInputPopUp };