<template>
  <div class="page-content">
      <el-row>
          <el-col :span="14">
                <el-row>
                    <el-col :span="21">
                        <div class="cp-console-title">监控面板</div>
                    </el-col>
                    <el-col :span="3">
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="clear">清空</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="cp-console-area">
                        <el-table
                            :data="crinfoList"
                            style="width:100%"
                            height=520>
                            <el-table-column
                                prop="jobName"
                                label="任务名称"
                                align="center"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="crawlerCount"
                                align="center"
                                label="爬取总数量"
                                width="95">
                            </el-table-column>
                            <el-table-column
                                prop="incCrawlerCount"
                                align="center"
                                label="爬取增量"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="saveCount"
                                align="center"
                                label="入库总数量"
                                width="95">
                            </el-table-column>
                            <el-table-column
                                prop="incSaveCount"
                                label="入库增量"
                                align="center"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="cpu"
                                label="CPU使用率"
                                align="center"
                                width="95">
                            </el-table-column>
                            <el-table-column
                                prop="ram"
                                label="内存使用率"
                                align="center"
                                width="95">
                            </el-table-column>
                            <el-table-column
                                prop="monitorTime"
                                label="时间"
                                align="center"
                                width="160">
                            </el-table-column>

                        </el-table>
                        <div>
                            <el-row>
                                <el-col :span="7">
                                    <div class="cp-crawl-buttom-info">
                                        <table class="cp-info-table">
                                            <tr>
                                                <th>当前爬取层数</th>
                                                <td>{{curDepth}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-row>
                <el-row>
                </el-row>
          </el-col>
          <el-col :span="10" style="border-left:3px double #918a8a;">
              <div class="cp-form"> 
                <div class="cp-form-box">
                    <el-row>
                        <el-col :span="5">主题文件</el-col>
                        <el-col :span="14"><input v-model="themeFileName" type="text" class="cp-form-box-file-input"></el-col>
                        <el-col :span="2">
                            <el-upload
                                class="upload-demo" 
                                ref="uploadTheme"
                                :show-file-list = "false"
                                :http-request = "themeFileChange"
                                :action="url"
                                :limit="1"
                                :file-list="themeFileList"
                                accept=".txt">
                                <el-button size="small" round>上传<i class="el-icon-upload el-icon--right"></i>
                                </el-button>
                            </el-upload>
                        </el-col>
                    </el-row>
                </div>
                <div class="cp-form-line">
                </div>
                <div class="cp-form-box">
                    <el-row>
                        <el-col :span="5">域名文件</el-col>
                        <el-col :span="14"><input type="text" class="cp-form-box-file-input" v-model="domainFileName"></el-col>
                        <el-col :span="2">
                            <el-upload
                                class="upload-demo"
                                ref="uploadDomain"
                                :show-file-list = "false"
                                :http-request = "domainFileChange"
                                :action="url"
                                :limit="1"
                                :file-list="domainFileList"
                                accept=".txt">
                                <el-button size="small" round>上传<i class="el-icon-upload el-icon--right"></i>
                                </el-button>
                            </el-upload>
                        </el-col>
                    </el-row>
                </div>
                <div class="cp-form-box">
                    <el-row>
                        <el-col :span="5">爬取范围</el-col>
                        <el-col :span="14">
                            <el-radio-group v-model="searchrange">
                                <el-radio label = "current">当前域名</el-radio>
                                <el-radio label = "list">列表域名</el-radio>
                                <el-radio label = "all">不限</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                </div>
                <div class="cp-form-line">
                </div>
                <div class="cp-form-box">
                    <el-row>
                        <el-col :span="5">爬取层数</el-col>
                        <el-col :span="7"><input type="text" v-model="searchdepth" class="cp-form-box-num-input"></el-col>
                        <el-col :span="5">爬取数量</el-col>
                        <el-col :span="5"><input type="text" v-model="searchnum" class="cp-form-box-num-input"></el-col>
                    </el-row>
                </div>
                <div class="cp-form-line">
                </div>
                <div class="cp-form-box">
                    <el-row>
                        <el-col :span="8" :offset="8">
                            <el-button type="primary" :loading="buttonLoading" plain @click="submitUpload">开 始</el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="danger" plain @click="stopCrawler">停 止</el-button>
                        </el-col>
                    </el-row>
                </div>
              </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>

import {serverpath} from '../api'

var themeFile = null;
var domainFile = null;
var stopFlag = 0;
export default {
    data(){
        return{
            searchrange:"current",
            url:serverpath.ipAddress+serverpath.port_startCrawl,
            themeFileList:[],
            domainFileList:[],
            themeFileName:"",
            domainFileName:"",
            searchnum:"",
            searchdepth:"",
            crinfoList:[],
            buttonLoading:false,
            curDepth:""
        }
    },
    methods:{
        themeFileChange(event){
            themeFile = event.file;
            this.themeFileName = event.file.name;
            this.themeFileList = [];
            /* this.themeFile = file.name;
            this.themeFileList = fileList; */
        },
        domainFileChange(event){
            domainFile = event.file;
            this.domainFileName = event.file.name;
            this.domainFileList = [];
            /* this.domainFile = file.name;
            this.domainFileList = fileList; */
        },
        submitUpload(){
            
            let params  = new FormData();
            
            //console.log(themeFile);
            //console.log(domainFile);
            params.append('subFile',themeFile);
            params.append('depth',this.searchdepth);
            params.append('count',this.searchnum);
            params.append('domainFile',domainFile);
            params.append('limitType',this.searchrange);
            let config = {  
                headers:{'Content-Type':'multipart/form-data'}  
            };
            var _this = this;
            this.axios.post('/MonitorCenter'+serverpath.port_startCrawl,params,config).then(res=>{
                if(res.data.code==0){
                    this.$message({
                        message: '爬虫任务已启动',
                        type: 'success',
                        showClose:true,
                        duration:6000
                    });
                    stopFlag = 0;
                    this.crinfoList = [];
                    _this.buttonLoading = true;
                    window.setTimeout(this.getMonitorData,20*1000);
                }
                
            });

           
        },
        stopCrawler(){
            this.axios.post('/MonitorCenter'+serverpath.port_stopCrawl).then(res=>{
                if(res.data.code==0){
                    this.$message({
                        message: '爬虫任务已停止',
                        showClose:true,
                        duration:6000
                    });
                    this.buttonLoading = false;
                    stopFlag = 1;
                }
            })
        },
        handleCommand(command){
            if(command=="clear"){
                this.crinfoList = [];
            }
        },
        getMonitorData(){
            if(stopFlag==1){
                return;
            }
            let jobId = 1;
            let params  = new FormData();
            params.append('jobId',jobId);
            var _this = this;
            //console.log("获取监控信息");
            this.axios.post('/MonitorCenter'+serverpath.port_getMsg,params).then(res=>{
                
                if(res.data.data.status==0){
                    //console.log(res.data.data.tableData);
                    _this.setTableData(res.data.data);
                    window.setTimeout(_this.getMonitorData,3*1000);
                }
                if(res.data.data.status==1){
                    _this.setTableData(res.data.data);
                    _this.buttonLoading = false;
                    this.$message({
                        message: '爬虫任务已完成',
                        type: 'success',
                        showClose:true,
                        duration:6000
                    });
                }
            })

        },
        setTableData(data){
            var tableData = data.tableData;
            this.curDepth = data.nowDepth;
            this.crinfoList = [];
            let length = tableData.length;
            while (length>0) {
                this.crinfoList.push(tableData[length-1]);
                length = length -1;
            }
        }
    },
    mounted(){
        
    }
}
</script>

<style>

</style>
