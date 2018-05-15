<template>
  <div class="page-content" style="padding-top:0px;">
      <div class="sp-form-area">
        <el-form ref="searchform" :model="searchform">
            <el-form-item>
                <el-row :gutter="10">
                    <el-col :span="14">
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
                    <el-col  :span="11">
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
                <el-col :span="4">
                    <el-button type="text"  style="font-size:16px;font-weight:600;" @click="addFields()">+ 添加另一字段</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="text"  style="font-size:16px;font-weight:600;" @click="removeAllFields()">清除所有字段</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" plain size="medium" @click="getResult()">检 索</el-button>
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
          :page-size=pageSize
          @current-change="handlePageChange"
          layout="prev, pager, next"
          :total=rsNum>
        </el-pagination>
      </div>
  </div>
</template>

<script>
import qs from 'qs'
import {serverpath} from '../api'
import ResultUnit from '../components/ResultUnit'
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
            pageSize:10
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
        getResult(isTurn){
            if(!this.searchform.mustword.trim()){
                this.$message({
                    message: '第一个字段不能为空',
                    type: 'warning'
                });
                this.searchform.mustword = "";
                return;
            }
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'transparent'
            });
            if (!isTurn) this.curPage = 1;
            const {mustword, musttheme} = this.searchform;
            let params = {input1: mustword, select1: musttheme, pageIndex: this.curPage, pageSize: this.pageSize};
            if (this.searchform.otheritems.length) {
                this.searchform.otheritems.forEach((element, index) => {
                    if(element.word.trim()){
                        let count = index + 1;
                        params["relation"+count] = element.logic;
                        params["input"+(count+1)] = element.word;
                        params["select"+(count+1)] = element.theme;
                    }
                });
            }
            this.axios.post('/MonitorCenter'+serverpath.port_getResult,qs.stringify(params)).then(res => {
                const data = res.data.data;
                this.rsUnits = data.resultList;
                if (!(this.rsNum && isTurn)) this.rsNum = data.total;
                this.pageinitionShow = !!data.total;
                loading.close();
            }).catch(err=>{
                loading.close();
            })
        },
        handlePageChange(val) {
            this.curPage = val;
            this.getResult(true);
        }
    }
}
</script>

<style>
.sp-form-area {
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
}
</style>
