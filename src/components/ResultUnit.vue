<template>
  <div class="result-card">
      <!-- <el-col :span="12">
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
              <li>{{domain}}</li>
              <li>{{keyword}}</li>
              <li>{{url}}</li>
          </div>

      </el-col> -->
    <el-card class="box-card">
        <h3 class="result-unit-title">
            <a :href="content.url" target="_blank" v-html="formatTitle(content.title)"></a>
        </h3>
        <div class="result-unit-text">
            {{content.content}}
        </div>
        <div class="result-unit-website">
            <a :href="content.url" target="_blank">{{content.url}}</a>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {
    props:["content"],
    data(){
        return{

        }
    },
    methods:{
        jumpToSourceWeb(){
            window.open(this.url);
        },
        formatTitle(val) {
            var keyword = this.content.keyword;
            var p = new RegExp(keyword, 'g');
            return val.replace(p, `<em>${keyword}</em>`);
        }
    },
    mounted(){

    }
}
</script>

<style>
.result-card {
    width: 550px;
    margin-bottom: 15px;
}
.result-card a {
    text-decoration: none;
}
.result-card  em{
    color: #EA4335;
    font-style: normal;
}
.result-card:hover {
    transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
}
</style>
