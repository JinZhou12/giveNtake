<template>
  <div class="about">
    <el-tabs tab-position="top" style="height: 200px">
      <!-- CUSTOMER TAB -->
      <el-tab-pane label="Customer">
        <el-form
          :model="custInfo"
          :rules="rules"
          ref="custInfo"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="Email" prop="email">
            <el-input v-model="custInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="custInfo.password"></el-input>
          </el-form-item>
          <el-form-item label="Name" prop="name">
            <el-input v-model="custInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="Building Number" prop="building_num">
            <el-input v-model="custInfo.building_num"></el-input>
          </el-form-item>
          <el-form-item label="Street" prop="street">
            <el-input v-model="custInfo.street"></el-input>
          </el-form-item>
          <el-form-item label="City" prop="city">
            <el-input v-model="custInfo.city"></el-input>
          </el-form-item>
          <el-form-item label="State" prop="state">
            <el-input v-model="custInfo.state"></el-input>
          </el-form-item>
          <el-form-item label="Phone Number" prop="phone_num">
            <el-input v-model="custInfo.phone_num"></el-input>
          </el-form-item>
          <el-form-item label="Passport Number" prop="passport_num">
            <el-input v-model="custInfo.passport_num"></el-input>
          </el-form-item>
          <el-form-item label="Passport Expiration" prop="passport_exp">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="custInfo.passport_exp"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="Passport Country" prop="passport_country">
            <el-input v-model="custInfo.passport_country"></el-input>
          </el-form-item>
          <el-form-item label="Date of Birth">
            <el-col :span="11">
              <el-form-item prop="birth">
                <el-date-picker
                  type="date"
                  placeholder="Pick a date"
                  v-model="custInfo.birth"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitCustForm('custInfo')">{{
              createUserText
            }}</el-button>
            <el-button @click="resetForm('custInfo')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- STAFF TAB -->
      <el-tab-pane label="Staff">
        <el-form
          :model="staffInfo"
          :rules="rules"
          ref="staffInfo"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="Username" prop="username">
            <el-input v-model="staffInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="staffInfo.password"></el-input>
          </el-form-item>
          <el-form-item label="First Name" prop="first_name">
            <el-input v-model="staffInfo.first_name"></el-input>
          </el-form-item>
          <el-form-item label="Last Name" prop="last_name">
            <el-input v-model="staffInfo.last_name"></el-input>
          </el-form-item>
          <el-form-item label="Airline" prop="airline_name">
            <el-input v-model="staffInfo.airline_name"></el-input>
          </el-form-item>
          <el-form-item label="Date of Birth" prop="brith">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="staffInfo.birth"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitStaffForm('staffInfo')">{{
              createUserText
            }}</el-button>
            <el-button @click="resetForm('staffInfo')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  name: "SignUp",
  inject: ["BASEURL"],
  data() {
    return {
      custInfo: {
        email: "",
        password: "",
        name: "",
        building_num: "",
        street: "",
        city: "",
        state: "",
        phone_num: "",
        passport_num: "",
        passport_exp: "",
        passport_country: "",
        birth: "",
      },
      staffInfo: {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        birth: "",
        airline_name: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            type: "email",
            message: "The input is not valid E-mail",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please enter password",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "Please enter a name",
            trigger: "blur",
          },
        ],
        building_num: [
          {
            required: true,
            message: "Please enter a building number",
            trigger: "blur",
          },
        ],
        street: [
          {
            required: true,
            message: "Please enter a street",
            trigger: "blur",
          },
        ],
        city: [
          {
            required: true,
            message: "Please enter a city",
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "Please enter a state",
            trigger: "blur",
          },
        ],
        phone_num: [
          {
            required: true,
            message: "Please enter a phone number",
            trigger: "blur",
          },
        ],
        passport_num: [
          {
            required: true,
            message: "Please enter a passport number",
            trigger: "blur",
            max: 8,
          },
        ],
        passport_exp: [
          {
            type: "date",
            required: true,
            message: "Please enter a passport expiration date",
            trigger: "blur",
          },
        ],
        passport_country: [
          {
            required: true,
            message: "Please enter a passport country",
            trigger: "blur",
          },
        ],
        birth: [
          {
            type: "date",
            required: true,
            message: "Please enter a birth date",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "Please enter a username",
            trigger: "change",
          },
        ],
        first_name: [
          {
            required: true,
            message: "Please enter first name",
            trigger: "change",
          },
        ],
        last_name: [
          {
            required: true,
            message: "Please enter last name",
            trigger: "blur",
          },
        ],
        airline_name: [
          {
            required: true,
            message: "Please enter airline name",
            trigger: "blur",
          },
        ],
      },
      createUserState: false,
    };
  },
  methods: {
    submitCustForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const custInfo = this.custInfo;
          this.$store.dispatch("custSignUp", custInfo);
          this.$refs[form].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitStaffForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const staffInfo = this.staffInfo;
          this.$store.dispatch("staffSignUp", staffInfo);
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
  computed: {
    createUserText() {
      return !this.createUserState ? "Sign Up" : "Sending";
    },
  },
};
</script>
<style scoped>
.center {
  display: flex;
  justify-content: center;
  margin: 1rem;
}

.el-row {
  margin: 1rem;
}
</style>
