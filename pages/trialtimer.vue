<template>
    <v-content>
        <v-row>
            <v-col cols="3">
            <v-text-field light single-line outlined v-model="hour" label="hours" required></v-text-field>
            </v-col>
            <v-col cols="3">
            <v-text-field light single-line outlined v-model="minute" label="minute" required></v-text-field>
            </v-col>
            <v-col cols="3">
            <v-text-field light single-line outlined v-model="second" label="sesconds" required></v-text-field>
            </v-col>
        </v-row>
        <v-btn @click="startTimer">Start</v-btn>
      {{ formattedTimeLeft }}
      <br>
      Time Limit: {{(this.hour*60*60)+(this.minute*60)+(this.second)}}
    </v-content>
</template>

<script>
export default {
    data() {
        return {
            timeLimit:10,
            timePassed: 0,
             timerInterval: null,
             hour:'',minute:'',second:'',
            //  timeLimit:(this.hour*60*60)+(this.minute*60)+(this.second)
        }
    },
    computed: {
        timeLeft() {
          return this.timeLimit - this.timePassed
        },
        formattedTimeLeft() {
        console.log("FormattedTime Ran");
        const timeLeft = this.timeLeft;
        if(timeLeft == 0){
            clearInterval(this.timerInterval);
        }
        const hours = Math.floor(timeLeft /60/60);

        // The largest round integer less than or equal to the result of time divided being by 60.
        const minutes = Math.floor(timeLeft / 60)
        // Seconds are the remainder of the time divided by 60 (modulus operator)
        let seconds = timeLeft % 60
        // If the value of seconds is less than 10,then display seconds with a leading zero
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        // if (minutes < 10) {
        //     minutes = `0${minutes}`
        // }
        // if (hours < 10) {
        //     hours = `0${hours}`
        // }
        // The output in MM:SS format
        return `${hours}:${minutes}:${seconds}`
        }
    },
    methods: {
    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
        console.log("Timer Interval",this.timePassed);

    }
  },
  mounted() {
      alert("mounted ran")
    // this.startTimer();
    
  },
}
</script>

<style>

</style>