function signUp(event) {
    event.preventDefault();

    const getSpin = document.querySelector('.spin');
    getSpin.style.display = 'inline-block';

    const getName = document.getElementById('fname').value;
    const getEmail = document.getElementById('femail').value;
    const getPass = document.getElementById('fpass').value;
    const getCpass = document.getElementById('fcpass').value;

    if (getName === "" || getEmail === "" || getPass === "" || getCpass === "") {
        Swal.fire ({
            icon: 'info',
            text: 'All fields are required',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = 'none';
    }
        
    if (getCpass !== getPass) {
        Swal.fire ({
            icon: 'info',
            text: 'Password do not match!',
            confirmButtonColor: '#2D85DE'
        })
    }

    else {
        const signData = new FormData();
        signData.append('name', getName);
        signData.append('email', getEmail);
        signData.append('password', getPass);
        signData.append('password_confirmation', getCpass);

        const signReq = {
            method: 'POST',
            body: signData
        }

        const url = 'https://pluralcodesandbox.com/yorubalearning/api/register_admin';

        fetch(url, signReq)
        .then(response => response.json())
        .then(result => {console.log(result)
            if (result.status === "success") {
                Swal.fire ({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                }) 

                setTimeout(() => {
                    location.href = "index.html"
                }, 3000)
            }

            else {
                Swal.fire ({
                    icon: 'info',
                    text: 'Registration Unsuccesful',
                    confirmButtonColor: '#2D85DE'
                }) 

                getSpin.style.display = 'none';
            }
        })
        .catch(error => console.log('error', error));
    }
}