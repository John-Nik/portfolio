'use server'

export default async function HandleSubmit(form) {
    const formData = new FormData(form[0]);

    fetch("https://john-nik.com/contact", {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeURI( {'form-name': 'contact', name: 'name' })
    })

    .then((res) => res)
    .catch(error => console.log(error))
}