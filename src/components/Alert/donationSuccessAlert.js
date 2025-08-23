import Swal from "sweetalert2";

export default function donationSuccessAlert () {
    Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your donation has made a difference to children's education",
        confirmButtonText: "Continue",
        timer: 5000,
    });
}