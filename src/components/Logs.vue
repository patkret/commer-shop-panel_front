<template>
    <div class="logs">
        <ul>
            <li v-for="log in logs" class="single-log">
                <span class="date">{{log.created_at}}</span>
                <span class="action"> {{log.module.name}} "{{log.item_name}}" został(a) {{log.action.name}} przez użytkownika <b>{{log.user.first_name}} {{log.user.last_name}}</b></span>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'logs',
    data: () => ({
    logs: [],
    modules: [],
    actions: [],
  }),

  methods: {
    fetchAllLogs()
    {
      axios('user-logs').then(result => {
        this.logs = result.data
    })
    }
  ,
  }
  ,
  created: function () {
    this.fetchAllLogs()
  }
  ,
  }
</script>

<style scoped>
    .logs {
        display: flex;
        flex-direction: row;
        justify-content: start;
    }

    .single-log {
        display: grid;
        grid-template-columns: 150px 1fr;
        align-items: center;
        width: 70vw;
        height: 55px;
        background-color: #ffffff;
        border: 1px solid #F5F7FA;
        box-shadow: 3px 3px 3px #dddddd;
        border-radius: 5px;
        margin-bottom: 25px;
    }

    .single-log span {

        margin-left: 25px;
    }
</style>