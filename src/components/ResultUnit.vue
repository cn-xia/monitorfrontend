<template>
  <div>
      <el-col :span="12">
          <div class="result-unit-card">
              <div class="result-unit-title">
                  <span>{{title}}</span>
              </div>
              <div class="result-unit-text">
                  {{content}}
                  
              </div>
              <div class="result-unit-website">
                  <span @click="jumpToSourceWeb()">{{url}}</span>
              </div>
              <!-- <li>{{domain}}</li>
              <li>{{keyword}}</li>
              <li>{{url}}</li> -->
          </div>

      </el-col>
  </div>
</template>

<script>
export default {
    props:["title","content","url"],
    data(){
        return{

        }
    },
    methods:{
        jumpToSourceWeb(){
            window.open(this.url);
        }
    },
    mounted(){

    }
}
</script>

<style>

</style>
