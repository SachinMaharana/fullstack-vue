const inputComponent = {
  template: `
      <input class="input is-small" type="text" v-model="input" @keyup.enter="monitorEnterKey" :placeholder="placeholder"/>
    `,
  props: ["placeholder"],
  data() {
    return {
      input: ""
    };
  },
  methods: {
    monitorEnterKey() {
      EventBus.$emit("add-note", {
        note: this.input,
        timestamp: new Date().toLocaleString()
      });
      this.input = "";
    }
  }
};

const noteCountComponent = {
  template: `
   <div class="note-count">
    Note Count: <strong>{{noteCount}}</strong>
   </div>
    `,
  data() {
    return {
      noteCount: 0
    };
  },
  created() {
    EventBus.$on("add-note", event => this.noteCount++);
  }
};

const EventBus = new Vue();

new Vue({
  el: "#app",
  components: {
    "input-component": inputComponent,
    "note-count-component": noteCountComponent
  },
  data: {
    notes: [],
    timestamps: [],
    placeholder: "Enter a note..."
  },
  methods: {
    addNote(e) {
      this.notes.push(e.note);
      this.timestamps.push(e.timestamp);
    }
  },
  created() {
    EventBus.$on("add-note", event => this.addNote(event));
  }
});
