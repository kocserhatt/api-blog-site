// HTML öğelerini seçme
const bloglar = document.querySelector("#bloglar");
const yorumDialog = document.querySelector(".dialog");

// Blog gönderilerini getiren fonksiyon
async function fetchTest() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
}

// Yorumları getiren fonksiyon
async function fetchTestComment() {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  const data = await response.json();
  return data;
}

// Blog listesini oluşturan fonksiyon
async function getBlog() {
  // Blog gönderilerini al
  const blogs = await fetchTest();

  // Blog gönderilerini döngü ile dolaş ve HTML öğelerini oluştur
  for (let i = 0; i < blogs.slice(0, 20).length; i++) {
    bloglar.innerHTML += `
      <li id=${i} class="post">
          <button class="addBtn">
              ${blogs[i].title} <br/>
          </button>
          <dialog class="dialog">
              <div class="dialogTitle">${blogs[
                i
              ].title.toUpperCase()}</div><br/>
              <div class="dialogBody">${blogs[i].body}</div><br/>
              <button class="commentBtn"> Yorumlar </button>
              <ul class="comment"> 
              </ul>
              <button class="kapat">Kapat</button>  
          </dialog>
      </li>`;
  }

  // Olay dinleyicilerini ekle
  showDialog();
  bindKapat();
  catchComments();
  clearCommentBtn();
}

// Yorum düğmesini temizleyen fonksiyon
function clearCommentBtn() {
  const addBtns = document.querySelectorAll(".addBtn");
  for (const addBtn of addBtns) {
    addBtn.addEventListener("click", function () {
      let dizi = [];
      this.nextElementSibling.childNodes[9].textContent = "";
    });
  }
}

// Yorumları dinleyen fonksiyon
async function catchComments() {
  const comments = await fetchTestComment();
  const yorumlar = document.querySelectorAll(".comment");
  const yorumBtns = document.querySelectorAll(".commentBtn");

  for (const yorumBtn of yorumBtns) {
    yorumBtn.addEventListener("click", function () {
      for (const yorum of yorumlar) {
        yorum.innerHTML = "";
      }
      const index = parseInt(this.parentElement.parentElement.id) + 1;
      console.log(index);
      for (let i = 0; i < comments.slice(0, 100).length; i++) {
        if (index == comments[i].postId) {
          for (const yorum of yorumlar) {
            yorum.innerHTML += ` <li>
                                              ${comments[i].body}
                                          </li>`;
          }
        }
      }
    });
  }
}

// Dialog penceresini gösteren fonksiyon
function showDialog() {
  const addBtns = document.querySelectorAll(".addBtn");
  for (const addBtn of addBtns) {
    addBtn.addEventListener("click", function () {
      this.nextElementSibling.showModal();
    });
  }
}

// Kapat düğmesine bağlayan fonksiyon
function bindKapat() {
  const kapatBtns = document.querySelectorAll(".kapat");
  for (const kapatBtn of kapatBtns) {
    kapatBtn.addEventListener("click", function () {
      this.parentElement.close();
    });
  }
}

// Blogları getir
getBlog();
