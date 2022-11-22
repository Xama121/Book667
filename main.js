let form = document.querySelector("#form");

let name1 = document.querySelector(".name");
let email = document.querySelector(".email");
let img = document.querySelector(".imageUrl");

let btn = document.querySelector(".btn");
let list = document.querySelector(".list");

btn.addEventListener("click", () => {
  if (!name1.value.trim() || !email.value.trim() || !img.value.trim()) {
    //проверка на заполненость инпута
    alert("Заполните поле");
    return;
  }
  let person = {
    name: name1.value,
    email: email.value,
    img: img.value,
  };
  setItemToStorage(person);
  createElement();
  name1.value = "";
  email.value = "";
  img.value = "";
});
createElement();

function setItemToStorage(obj) {
  let data = JSON.parse(localStorage.getItem("kontaks")) || [];
  data.push(obj);
  localStorage.setItem("kontaks", JSON.stringify(data));
}

// form.addEventListener("submit", "person");

// function createElement() {
//   list.innerHTML = "";
//   if (!localStorage.getItem("kontaks")) {
//     localStorage.setItem("kontaks", "[]");
//   }

//   let newDate = JSON.parse(localStorage.getItem("kontaks"));

//   console.log(newDate);
//   newDate.forEach((item, index) => {
//     list.innerHTML = "";
//     let li = document.createElement("li");
//     let btnDelete = document.createElement("button");

//     li.innerText = `${item.name}, ${item.email}, ${item.img}`;
//     btnDelete.innerText = "Delete";

//     document.body.append(li);
//     document.body.append(btnDelete);
//     console.log(btnDelete);
//     btnDelete.addEventListener("click", () => {
//       deleteElement(index);
//     });
//   });
// }
function createElement() {
  // отображение данных
  list.innerHTML = ""; // Очищаем страницу
  if (!localStorage.getItem("kontaks")) {
    // Проверка на наличие ключа в LocalStorage
    localStorage.setItem("kontaks", "[]");
  }
  let newDate = JSON.parse(localStorage.getItem("kontaks"));
  console.log(newDate);
  newDate.forEach((item, index) => {
    // Перебираем массив и для каждого элемента создаем новый li тэг с кнопками
    let li = document.createElement("li");
    let btnEdit = document.createElement("button");
    let btnDelete = document.createElement("button");

    // console.log(li);

    li.innerText = `${item.name}, ${item.email}, ${item.img}`;
    btnEdit.innerText = "Edit";
    btnDelete.innerText = "Delete";

    li.append(btnEdit);
    li.appendChild(btnDelete);

    btnDelete.addEventListener("click", () => {
      //событие на кнопку удаления
      deleteElement(index); //Функция удаления
    });

    btnEdit.addEventListener("click", () => {
      //событие на кнопку редактирвоания
      editElement(item, index); //Функция редактированиея
    });

    list.appendChild(li); // Добавляем в тег ul новый созданный тег li
    // console.log(li);
  });
}

function deleteElement(index) {
  list.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("kontaks"));
  data.splice(index, 1);
  localStorage.setItem("kontaks", JSON.stringify(data));
  createElement();
}

let mainModal = document.querySelector(".main-modal");
let inpEdit = document.querySelector(".inp-edit");
let inpEdit2 = document.querySelector(".inp-edit2");
let inpEdit3 = document.querySelector(".inp-edit3");
let btnCloser = document.querySelector(".btn-closer");

function editElement(item, index) {
  mainModal.style.display = "block";
  inpEdit.setAttribute("id", index);
  inpEdit2.setAttribute("id", index);
  inpEdit3.setAttribute("id", index);
  inpEdit.value = item.name;
  inpEdit2.value = item.email;
  inpEdit3.value = item.name;
}

let btnSave = document.querySelector(".btn-save");

btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("kontaks"));
  let index = inpEdit.id;
  if (!inpEdit.value.trim()) {
    alert("Заполните поле");
    return;
  }
  let newTask = {
    name: inpEdit.value,
    email: inpEdit2.value,
    img: inpEdit3.value,
  };
  data.splice(index, 1, newTask);
  localStorage.setItem("kontaks", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
});

btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});
