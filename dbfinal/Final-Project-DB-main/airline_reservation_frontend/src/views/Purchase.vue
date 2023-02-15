<template>
  <div class="about">
    <h3>Flight Number: {{ flightInfo.flight_num }}</h3>
    <h3>Departing At: {{ flightInfo.dept_datetime }}</h3>
    <h3>Arriving At: {{ flightInfo.arr_datetime }}</h3>
    <h3>Departure: {{ flightInfo.dept_airport }}</h3>
    <h3>Arrival: {{ flightInfo.arr_airport }}</h3>
    <h3>Airline: {{ flightInfo.airline_name }}</h3>
    <h3>price: {{ flightInfo.base_price }}</h3>
    <h3>available seats: {{ flightInfo.remaining_seats }}</h3>
    <h3>Status: {{ flightInfo.flight_status }}</h3>

    <div v-if="!hasTheDatePassed">
      <el-form
        :model="purchaseInfo"
        :rules="rules"
        ref="purchaseInfo"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="purchaseInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="Card Type" prop="card_type">
          <el-select v-model="purchaseInfo.card_type" placeholder="Card Type">
            <el-option label="Debit" value="Debit"></el-option>
            <el-option label="Credit" value="Credit"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Card Number" prop="card_num">
          <el-input v-model="purchaseInfo.card_num"></el-input>
        </el-form-item>
        <el-form-item label="Card Expiration" prop="card_exp">
          <el-date-picker
            type="month"
            placeholder="Pick a date"
            v-model="purchaseInfo.card_exp"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitPurchase('purchaseInfo')"
            >Purchase</el-button
          >
          <el-button @click="resetForm('purchaseInfo')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <!-- Put a divider line -->
      <el-divider></el-divider>
      <h3>This flight has already passed</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Purchase",
  data() {
    return {
      purchaseInfo: {
        name: "",
        card_type: "",
        card_num: "",
        card_exp: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "The input is not valid E-mail",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "Please enter your name on the card",
            trigger: "blur",
          },
        ],
        card_type: [
          {
            required: true,
            message: "Please select card type",
            trigger: "blur",
          },
        ],
        card_num: [
          {
            required: true,
            message: "Please enter a card number",
            trigger: "blur",
            max: 19,
          },
        ],
        card_exp: [
          {
            type: "date",
            required: true,
            message: "Please enter a card expiration date",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitPurchase(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const purchaseInfo = this.purchaseInfo;
          this.$store.dispatch("custPurchase", purchaseInfo);
          this.$refs[form].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    },
  },
  mounted() {
    const flightNum = this.$route.params.flightNum;
    this.$store.dispatch("getSingleFlight", flightNum);
  },
  computed: {
    flightInfo() {
      return this.$store.state.singleFlight;
    },
    hasTheDatePassed() {
      // Check if flightInfo.dept_datetime has already passed today
      const today = new Date();
      const flightDate = new Date(this.flightInfo.dept_datetime);
      if (flightDate < today) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
