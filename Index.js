let url = "http://localhost:3000/data";
document.getElementById("adddata").addEventListener("click",()=>{
  document.getElementById("d").classList.remove("d-block");
  document.getElementById("d").classList.add("d-none");
})
function start() {
  postdata();
  getdataa();
}
function postdata() {
  document.getElementById("c").addEventListener("click", () => {
   
    let myname = document.forms.name;
    let myemail = document.forms.email;
    let mypass = document.forms.password;
    let myage = document.forms.age;
    let myphone = document.forms.phone;

    let data = {
      name: myname.value,
      email: myemail.value,
      pass: mypass.value,
      age: myage.value,
      phone: myphone.value,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then();
  });
  console.warn("data posted successfuklly");
}

function getdataa() {
  fetch(url)
    .then((res) => res.json())
    .then((ress) => {
      let pdata = [];
      pdata = ress;
      console.warn(pdata);

      pdata.map((i) => {
        let { id, name, email, pass, age, phone } = i;
        document.getElementById("table").innerHTML += `
            <tr>
              <td scope="row">${name}</td>
              <td scope="row">${email}</td>
              <td scope="row">${pass}</td>
              <td>${age}</td>
              <td>${phone}</td>
              <td><button  class="btn btn-danger" onclick="deletedata('${id}')">Delete</button></td>
              <td><button data-bs-toggle="modal" class="btn btn-primary" data-bs-target="#exampleModal" onclick="putdata('${id}')">Edite</button></td>

            </tr>`;
      });
    });
}

function deletedata(id) {
  console.log(id);
  let promise = fetch(`${url}/${id}`, {
    method: "DELETE",
  }).then();

  console.log(promise);
}

function putdata(id) {
  document.getElementById("c").classList.remove("d-block")
  document.getElementById("c").classList.add("d-none");
  document.getElementById("d").classList.add("d-block")
  console.log(id);
  fetch(`${url}/${id}`)
    .then((res) => res.json())
    .then((i) => {
      let myname = document.forms.name;
      let myemail = document.forms.email;
      let mypass = document.forms.password;
      let myage = document.forms.age;
      let myphone = document.forms.phone;
      myname.value = i.name;
      myemail.value = i.email;
      mypass.value = i.pass;
      myage.value = i.age;
      myphone.value = i.phone;
      let data = {
        name: myname.value,
        email: myemail.value,
        pass: mypass.value,
        age: myage.value,
        phone: myphone.value,
      };
      document.getElementById("d").addEventListener("click", () => {
        let myname = document.forms.name;
        let myemail = document.forms.email;
        let mypass = document.forms.password;
        let myage = document.forms.age;
        let myphone = document.forms.phone;
        let data = {
          name: myname.value,
          email: myemail.value,
          pass: mypass.value,
          age: myage.value,
          phone: myphone.value,
        };
        fetch(`${url}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      });
    });
}
start();
