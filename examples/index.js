
let input = document.querySelector('input[type=file]');
let access_token;
//let base_url = 'http://10.10.30.19:3000';
let base_url = 'http://localhost:3000';

input.addEventListener('change', changeFile);


function changeFile() {
    var file = input.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', (e) => {
        const blob = new Blob([new Uint8Array(e.target.result)], { type: file.type });

        // Convert to base64
        let reader1 = new FileReader();
        reader1.readAsDataURL(blob);

        reader1.onload = function () {
            let image1 = new Image();
            image1.src = reader1.result;
            document.body.appendChild(image1);
            let imageBase64 = reader1.result;
            // Do something with the string
            //register(imageBase64);
        };

    });
    reader.readAsArrayBuffer(file);
}



async function register(blob) {
    console.log('Registering...');
    // Register user
    let res = await axios.post(base_url + '/auth/register', {
        username: 'user05',
        password: 'test',
        profilePicture: blob
    });
}
async function login() {
    console.log('Logging in....');
    // Login user
    let res1 = await axios.post(base_url + '/auth/login', {
        username: 'user05',
        password: 'test',
    });
    console.log(res1.status);
    access_token = res1.data.access_token;
}

async function getProfilePic() {
    console.log('Get profile pic');

    const config = {
        headers: { Authorization: `Bearer ${access_token}` }
    };
    let res2 = await axios.get(base_url + '/user/profilePic', config);
    //base64 encoded image
    console.log(res2.data);


    let image = new Image();
    image.src = res2.data;
    document.body.appendChild(image);
}


async function updateProfilePic(blob) {
    const config = {
        headers: { Authorization: `Bearer ${access_token}` }
    };

    let res = await axios.post(base_url + '/user/profilePic', {
        picture: blob,
    }, config);
    console.log('Updating profile pic');
}


(async () => {


})();