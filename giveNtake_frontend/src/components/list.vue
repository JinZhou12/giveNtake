<template>
  <el-table :data="tableData" max-height="500" style="width: 100%">
    <el-table-column prop="flight_num" label="Flight Number" width="150">
    </el-table-column>
    <el-table-column prop="dept_datetime" label="Departure" width="300">
    </el-table-column>
    <el-table-column prop="arr_datetime" label="Arrival" width="240">
    </el-table-column>
    <el-table-column prop="dept_airport" label="From" width="200">
    </el-table-column>
    <el-table-column prop="arr_airport" label="To" width="200">
    </el-table-column>
    <el-table-column prop="airline_name" label="Airline" width="120">
    </el-table-column>
    <el-table-column prop="flight_status" label="Status" width="120">
    </el-table-column>
    <el-table-column fixed="right" label="" width="80">
      <template #default="scope">
        <el-button
          @click="firstFunction(tableData[scope.$index].flight_num)"
          type="text"
          size="small"
          >{{ firstButton }}</el-button
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="" width="80">
      <template #default="scope">
        <el-button
          @click="secondFunction(tableData[scope.$index].flight_num)"
          type="text"
          size="small"
          >{{ secondButton }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "List",
  props: [
    "firstButton",
    "secondButton",
    "tableData",
    "firstFunction",
    "secondFunction",
  ],
  // methods: {
  //   handleClick() {
  //     console.log("click");
  //   },
  // },
  data() {
    return {};
  },
};
</script>
