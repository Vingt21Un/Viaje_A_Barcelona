const searchInput = document.querySelector("#search")
const searchResult = document.querySelector(".table-results")


let dataArray;

async function getUsers(){

  const res = await fetch("https://raw.githubusercontent.com/Vingt21Un/data/main/data.json")

  const { results }  = await res.json()
  
  dataArray = orderList(results)
  createUserList(dataArray)
}

getUsers()

function orderList(data) {

  const orderedData = data.sort((a,b) => {
    if(a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
      return -1;
    }
    if(a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
      return 1;
    }
    return 0;
  })
  
  return orderedData;
}


function createUserList(usersList) {

  usersList.forEach(user => {

    const listItem = document.createElement("div");
    listItem.setAttribute("class", "table-item");

    listItem.innerHTML = `
    <div class="container-img">
    <p class="name">${user.name.last} ${user.name.first}</p>
    </div>
    <p class="email">${user.email}</p>
    <p class="phone">${user.phone}</p>
    `//<img src=${user.picture.medium}> A replacer si besoin
    searchResult.appendChild(listItem);
  })

}

searchInput.addEventListener("input", filterData)

function filterData(e) {

  searchResult.innerHTML = ""

  const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");

  const filteredArr = dataArray.filter(el => 
    el.name.first.toLowerCase().includes(searchedString) || 
    el.name.last.toLowerCase().includes(searchedString) ||
    `${el.name.last + el.name.first}`.toLowerCase().replace(/\s/g, "").includes(searchedString) ||
    `${el.name.first + el.name.last}`.toLowerCase().replace(/\s/g, "").includes(searchedString)
    )

  createUserList(filteredArr)
}

/*

{
    "results": [
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "Clément",
                "last": "Meunier"
            },
            "location": {
                "street": {
                    "number": 9799,
                    "name": "Place de la Mairie"
                },
                "city": "Perpignan",
                "state": "Loir-et-Cher",
                "country": "France",
                "postcode": 33593,
                "coordinates": {
                    "latitude": "42.6094",
                    "longitude": "-154.6891"
                },
                "timezone": {
                    "offset": "-7:00",
                    "description": "Mountain Time (US & Canada)"
                }
            },
            "email": "clement.meunier@example.com",
            "login": {
                "uuid": "2a2f4b84-b418-40d6-bee7-7dd664cc6a00",
                "username": "tinykoala529",
                "password": "titanium",
                "salt": "StgFaZAB",
                "md5": "6f4ef6d06f63cc156f24d032fea6d719",
                "sha1": "eea47111c791569474ca6cc72d861108094ca784",
                "sha256": "a4ef66e8af6a8b577cd6b781550afa34c90b9b07c2feaae07194b18c502ca5b9"
            },
            "dob": {
                "date": "1993-08-22T17:13:18.778Z",
                "age": 30
            },
            "registered": {
                "date": "2019-02-16T19:23:16.758Z",
                "age": 4
            },
            "phone": "03-27-73-60-01",
            "cell": "06-10-46-34-35",
            "id": {
                "name": "INSEE",
                "value": "1930766752468 86"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/43.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/43.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/43.jpg"
            },
            "nat": "FR"
        },
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "Jordan",
                "last": "Legrand"
            },
            "location": {
                "street": {
                    "number": 5755,
                    "name": "Route de Genas"
                },
                "city": "Aix-En-Provence",
                "state": "Gard",
                "country": "France",
                "postcode": 37700,
                "coordinates": {
                    "latitude": "-60.5882",
                    "longitude": "-109.9501"
                },
                "timezone": {
                    "offset": "+2:00",
                    "description": "Kaliningrad, South Africa"
                }
            },
            "email": "jordan.legrand@example.com",
            "login": {
                "uuid": "17a5668a-ac83-46ae-8368-89504474f8ae",
                "username": "bigpanda915",
                "password": "monarch",
                "salt": "Bp0GO6Fo",
                "md5": "244e2681dbfa95afdfdeb1d5f7be6225",
                "sha1": "a25574a85937eadd9c45ad74b75c635b5443ed29",
                "sha256": "a6ec4cf076dc8128baba9672b5ce65b8c18e0953f55374cb581b00ab4d64c088"
            },
            "dob": {
                "date": "1993-07-04T10:02:42.633Z",
                "age": 30
            },
            "registered": {
                "date": "2019-10-08T06:58:09.646Z",
                "age": 4
            },
            "phone": "04-44-96-40-62",
            "cell": "06-82-35-91-23",
            "id": {
                "name": "INSEE",
                "value": "1930634108842 92"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/6.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/6.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/6.jpg"
            },
            "nat": "FR"
        }
    ],
    "info": {
        "seed": "0588657a16dbdc38",
        "results": 2,
        "page": 1,
        "version": "1.4"
    }
}

{
  "results": [
      {
          "name": {
              "first": "",
              "last": "Salut, Bonjour / Bonsoir"
          },
          "email": "Hola / Buenos días / Buenas tardes",
          "phone": "/"
      },
      {
          "name": {
              "first": "",
              "last": "Comment vous appelez vous ? / Comment t'appelles tu ?"
          },
          "email": "Cómo se llama usted ? / Cómo te llamas ?",
          "phone": "Vouvoyer / Tutoyer"
      },
      {
          "name": {
              "first": "",
              "last": "Je ne comprends pas"
          },
          "email": "No entiendo",
          "phone": "/"
      },
      {
          "name": {
              "first": "",
              "last": "Enchanté/e"
          },
          "email": "Encantado/a",
          "phone": "/"
      },
      {
          "name": {
              "first": "",
              "last": "Pouvez-vous parler plus lentement ?"
          },
          "email": "Puede usted hablar más despacio ?",
          "phone": "Ici on vouvoie, mais vous pouvez tutoyer"
      },
      {
          "name": {
              "first": "",
              "last": "Je veux"
          },
          "email": "Quiero",
          "phone": "/"
      },
      {
          "name": {
              "first": "",
              "last": "Je n'ai plus faim / soif"
          },
          "email": "Ya no tengo hambre / sed",
          "phone": "/"
      }
  ]
}

*/