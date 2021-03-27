var db = firebase.firestore();

// função de adicionar evento, adicionar no banco e adicionar no calendário
function addEvent() {
  let active_date = $("#calendar").evoCalendar("getActiveDate");
  let name = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let repetition = document.getElementById("yes").checked ? true : false;
  // setando os valores pro default
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("yes").checked = true;

  // adicionando no banco de dados
  db.collection("events")
    .add({
      id: "",
      name: name,
      description: description,
      date: active_date,
      type: "event",
      everyYear: repetition,
    })
    // pegando do banco de dados e colocando no calendário
    .then((docRef) => {
      // pegando o id gerado pelo banco de dados e setando como propriedade do documento, para poder usar o mesmo id
      // para apagar o evento
      db.collection("events")
        .doc(docRef.id)
        .update({ id: docRef.id })
        .then(
          db
            .collection("events")
            .doc(docRef.id)
            .get()
            .then((querySnapshot) => {
              $("#calendar").evoCalendar("addCalendarEvent", [
                {
                  id: docRef.id,
                  name: querySnapshot.data().name,
                  description: querySnapshot.data().description,
                  date: querySnapshot.data().date,
                  everyYear: querySnapshot.data().everyYear,
                  type: querySnapshot.data().type,
                },
              ]);
            })
        );
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

// mostrar os eventos para serem deletados
function displayAvailableEvents(array) {
  let select = document.getElementById("remove-selection");
  select.innerHTML = "";
  select.innerHTML = "<option selected>Escolha um evento para deletar</option>";
  array.map((evento) => {
    let option = document.createElement("option");
    option.text = evento.name;
    option.value = evento.id;
    select.appendChild(option);
  });
}

function removeEvent() {
  let selected = document.getElementById("remove-selection").value;
  $("#calendar").evoCalendar("removeCalendarEvent", selected);
  db.collection("events")
    .doc(selected)
    .delete()
    .then(() => {
      let eventsRef = db.collection("events");
      let active_date = $("#calendar").evoCalendar("getActiveDate");
      let sliced_date = active_date.slice(0, 6);
      let query = eventsRef
        .where("date", ">=", sliced_date)
        .where("date", "<=", sliced_date + "\uf8ff");
      query.get().then((doc) => {
        let array = doc.docs;
        let arrayWithData = [];
        for (let index = 0; index < array.length; index++) {
          let docWithData = array[index].data();
          arrayWithData.push(docWithData);
        }

        displayAvailableEvents(arrayWithData);
      });
    });
}
// pegar os events da database
function getEventsFromDatabase() {
  db.collection("events")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        $("#calendar").evoCalendar("addCalendarEvent", [
          {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            date: doc.data().date,
            type: doc.data().type,
            everyYear: doc.data().everyYear,
          },
        ]);
      });
    });
}
function getTodayEvents(event, newDate, oldDate) {
  let eventsRef = db.collection("events");
  let active_date = $("#calendar").evoCalendar("getActiveDate");
  let sliced_date = active_date.slice(0, 6);
  let query = eventsRef
    .where("date", ">=", sliced_date)
    .where("date", "<=", sliced_date + "\uf8ff");
  query.get().then((doc) => {
    let array = doc.docs;
    let arrayWithData = [];
    for (let index = 0; index < array.length; index++) {
      let docWithData = array[index].data();
      arrayWithData.push(docWithData);
    }

    displayAvailableEvents(arrayWithData);
  });
}
// funções que serão executadas assim que o usuario entrar na página
$(function () {
  // // função de pegar os eventos que foram colocados no banco de dados
  getEventsFromDatabase();
  document.getElementById("add-button").addEventListener("click", addEvent);
  document
    .getElementById("remove-button")
    .addEventListener("click", removeEvent);

  // pegar os eventos para serem deletados
  $("#calendar").on("selectDate", getTodayEvents);
});
