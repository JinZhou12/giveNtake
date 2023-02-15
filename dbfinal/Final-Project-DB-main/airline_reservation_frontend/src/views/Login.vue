<template>
  <div class="login">
    <el-row type="flex" justify="center">
      <el-col :span="50">
        <h1>Welcome Back</h1>
        <h3>Airline Reservation system</h3>
      </el-col>
    </el-row>
    <el-tabs tab-position="top" style="height: 200px">
      <el-tab-pane label="Customer">
        <el-form
          :model="custLoginInfo"
          ref="custLoginInfo"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="Email" prop="email">
            <el-input v-model="custLoginInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="custLoginInfo.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitCustForm('custLoginInfo')"
              >{{ loginUserText }}</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Staff">
        <el-form
          :model="staffLoginInfo"
          ref="staffLoginInfo"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="Username" prop="username">
            <el-input v-model="staffLoginInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="staffLoginInfo.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitStaffForm('staffLoginInfo')"
              >{{ loginUserText }}</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      custLoginInfo: {
        email: "",
        password: "",
      },
      staffLoginInfo: {
        username: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input your email",
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
            message: "Please input your password",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "Please input your username",
            trigger: "blur",
          },
        ],
      },
      loginUserText: "Login",
    };
  },
  methods: {
    submitCustForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const custInfo = this.custLoginInfo;
          this.$store.dispatch("custLogin", custInfo);
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
          const staffInfo = this.staffLoginInfo;
          this.$store.dispatch("staffLogin", staffInfo);
          this.$refs[form].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  async mounted() {
    if (localStorage.getItem("token") === null) {
      return;
    }

    const oldtoken = localStorage.getItem("token");
    const router = this.$router;
    const store = this.$store;

    const obj = { token: oldtoken };

    await axios
      .post(store.state.URL + "/auth", obj)
      .then((res) => {
        console.log(res.data);
        if (res.data.result) {
          store.commit("setLogintoTrue", true);
          router.push("/");
          return;
        }
        store.commit("setLogintoTrue", false);
        store.commit("passwordUpdate", "");
        store.commit("userUpdate", "");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style>
.center {
  display: flex;
  justify-content: center;
  margin: 1rem;
}

.el-row {
  margin: 1rem;
}
</style>
