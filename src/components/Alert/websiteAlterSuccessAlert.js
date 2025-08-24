import Swal from "sweetalert2";

export function videoPublishedSuccessAlert () {
    Swal.fire({
        icon: "success",
        title: "Video Published on Website!",
        confirmButtonText: "Close",
        timer: 5000,
    });
}