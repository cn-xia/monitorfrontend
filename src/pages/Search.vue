<template>
  <div class="page-content" style="padding-top:0px;">
      <div class="sp-form-area">
        <el-form ref="searchform" :model="searchform">
            <el-form-item>
                <el-row :gutter="10">
                    <el-col :span="18">
                        <el-input v-model="searchform.mustword"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="searchform.musttheme">
                            <el-option v-for="item in options"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item
                v-for="unit in searchform.otheritems"
                :key="unit.no">
                <el-row :gutter="10">
                    <el-col :span="3">
                        <el-select v-model="unit.logic">
                            <el-option v-for="item in logicOptions"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col  :span="15">
                        <el-input v-model="unit.word"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="unit.theme">
                            <el-option v-for="item in options"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2">
                        <el-button @click.prevent="removeFields(unit)" type="danger" icon="el-icon-delete" size="mini" plain></el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <el-row>
                <el-col :span="4" :offset="11">
                    <el-button type="text"  style="font-size:16px;font-weight:600;" @click="addFields()">+ 添加另一字段</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="text"  style="font-size:16px;font-weight:600;" @click="removeAllFields()">清除所有字段</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" plain size="medium" @click="getResult()" v-loading.fullscreen.lock="fullscreenLoading">检 索</el-button>
                </el-col>
        </el-row>
      </div>
      <div class="sp-result-info" v-show="resInfoShow">
          找到约 {{rsNumStr}} 条结果
      </div>
      <div class="sp-result-area">
          <el-row>
              <component :is="resultComp" v-for="rsUnit in rsUnits" :key=rsUnit.id
                  :content="rsUnit">
              </component>
          </el-row>
      </div>
      <div class="sp-pagination"  v-show="pageinitionShow">
        <el-pagination
          background
          :current-page=curPage
          :page-sizes="[6, 8, 10, 12]"
          :page-size = pageSize
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          layout="sizes, prev, pager, next"
          :total=rsNum>
        </el-pagination>
      </div>
  </div>
</template>

<script>

import {serverpath} from '../api'
import ResultUnit from '../components/ResultUnit.vue'
var curResultList = [];
export default {
    data(){
        return{
            resultComp:"ResultUnit",
            options:[{value:"标题"},{value:"域名"},{value:"关键字"}],
            logicOptions:[{value:"and"},{value:"or"},{value:"not"}],
            searchform:{
                mustword:"",
                musttheme:"关键字",
                otheritems:[]
            },
            fullscreenLoading: false,
            resInfoShow:false,
            pageinitionShow:false,
            rsNumStr:"",
            rsUnits:[],
            curPage:1,
            rsNum:6,
            pageSize:6
        }
    },
    components:{
        ResultUnit
    },
    methods:{
        addFields(){
            if(this.searchform.otheritems.length>=2){
                this.$message({
                    message: '最多只能有三个字段',
                    type: 'warning'
                });
                return;
            }
            this.searchform.otheritems.push({logic:"and",word:"",theme:"关键字"})
        },
        removeAllFields(){
            this.searchform.otheritems=[];
        },
        removeFields(item){
            var index = this.searchform.otheritems.indexOf(item);
            if(index!==-1){
                this.searchform.otheritems.splice(index,1);
            }
        },
        getResult(){
            if(this.searchform.mustword.match(/^[ ]*$/)){
                this.$message({
                    message: '第一个字段不能为空',
                    type: 'warning'
                });
                this.searchform.mustword = "";
                return;
            }
            let params = new FormData();
            params.append('input1',this.searchform.mustword);
            params.append('select1',this.searchform.musttheme);
            let count = 1;
            this.searchform.otheritems.forEach(element => {
                if(!element.word.match(/^[ ]*$/)){
                    params.append("relation"+count,element.logic);
                    params.append("input"+(count+1),element.word);
                    params.append("select"+(count+1),element.theme);
                    count++;
                }
                
            });
            var _this = this;
            this.fullscreenLoading = true;
            this.axios.post('/MonitorCenter'+serverpath.port_getResult,params).then(res=>{
                console.log(res.data);
                curResultList = res.data.data.resultList;
                _this.handlePageChange(1)
                this.fullscreenLoading = false;
            }).catch(err=>{
                this.fullscreenLoading = false;
            })
        },
        handleSizeChange(val){
            this.pageSize = val;
            this.handlePageChange(this.curPage);
        },
        handlePageChange(val){
            this.curPage = val;
            let sum = curResultList.length;
            this.rsNumStr = sum;
            this.rsNum = sum;
            this.resInfoShow = true;
            this.pageinitionShow = true;

            let flag = parseInt(sum/this.pageSize);
            let low = (val-1)*this.pageSize;
            if(val<flag){
                var high = val*this.pageSize-1
            }else{
                var high = sum-1;
            }
            this.rsUnits = [];
            for (let index = low; index <= high; index++) {
                const element = curResultList[index];
                var unit = {};
                this.rsUnits.push(element);
            }
        }
    }
}
</script>

<style>
.sp-form-area {
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
}
</style>
