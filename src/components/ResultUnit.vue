<template>
  <div class="result-card">
    <el-card class="box-card">
        <h3 class="result-unit-title">
            <a :href="content.url" target="_blank" v-html="formatTitle(content.title)"></a>
        </h3>
        <div class="result-unit-text">
            <div class="content-image" v-if="content.imgUrl">
                <img :src="content.imgUrl" alt="">
                <a class="video-pic" v-if="content.videoUrl" :href="content.videoUrl" target="_blank"></a>
            </div>
            <div class="content-text">
                {{content.content?content.content.trim():''}}
            </div>
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
.result-unit-text {
    display: flex;
}
.result-unit-text .content-image {
    flex: 0 0 60px;
    vertical-align: top;
    position: relative;
}
.result-unit-text .content-text {
    flex: 1;
}
.content-image + .content-text {
    margin-left: 10px;
}
.video-pic {
    position: absolute;
    height: 40px;
    width: 40px;
    top: 50%;
    left: 50%;
    margin: -20px 0 0 -20px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmOWQ4YzVjMi1kMjNiLTQ5ZjEtOWIyNi0wOGY3MmY4MTc1NTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDc0OTQ3OURGODgzMTFFNUFFQkZEMDZGREMzOTdFMTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDc0OTQ3OUNGODgzMTFFNUFFQkZEMDZGREMzOTdFMTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2Y2IwNzk4OC0yYjNiLTQ2MDItYTllMS0zNzI1Yzk5NTZmMmQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZjlkOGM1YzItZDIzYi00OWYxLTliMjYtMDhmNzJmODE3NTUzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Rtt+oAAABS5JREFUeNq8mWtIW2cYxxOXpNtUoihYbbxhzMAJ3jMvKxPnZR9Gvawdm2hhWOy+DLzPil91ImzKPq2jH1QQyqBRB4La6izzNi9RQYMzGg3qbCcuc5rNxBj3f9w53WhXzck5xwcekkPO+7y/vO95n9uRnpycSNyQV6Dp0AxoNPQK1AeqYH63Q3+HbkEXoEPQYegx14mkHAEjoGXQd61Wq3N1dXVrcnLy6cTExN74+PjB9vb2Ed0UGBgoT0lJ8UpOTlZqtdqAiIiIK56enh74aRDaCl0VGvAy9AvoOzMzM8uNjY0/63Q6C5d/VlBQ4FtXV/dGQkKCBpePoXegT4QAvAWtnp+fX8/Pz9evra3ZJDwkPDz8UldXV3xMTEwYLr+EfnvW/R5n/CaHtlsslsqampqHsbGx43zhSMgG2aqurn4I2+U0BzMXpxX0hn5nNpt9kpKShnZ2do4kIoifn58cj0xGaGgoHagPofuuANK/6TYajV7R0dHDdrv9RCKiKBQK6cLCQnpkZOQBLvOgR+cBdmDlItVq9YDD4RAVjhWZTCZdWVnJxkoacXnzrGewFM9FIk7a0EXBkdBcNCfNjcvbLwMkV1IJFzK0u7t7JLlgoTkbGhrIoVcyjv+FLW6HK7lMJ8xVozhAyqmpqT0hQWdnZ1PA8JTdanYFyXlezcvL03MxVl9fn4hIcj0kJORVoQDJ1+LjbYbpGeBn09PTy+vr65z9HFbxzbm5udvFxcUqIQCJgViIiQWkwJ9J4ctdo76+vj5tbW2fdHZ2XqUTyReSYckkNgJMR+B3IPxY+Bj1gBQWFmYsLi7ejIuL8+Zji1iIidgIMBM+6BehniGNRhM2MjLyKcKjho8dZErElEGAUQg3vwp5El+HNDU1fdzf3/+eUqmUuWMDzyGd5GgCVI2OjlqE9mtSqVSSnZ39lsFguJWVleXPdTyYKD6rCJB8mVUsBxwUFBTQ29tb2tLSEsdlHMOkJEDFxsaGqJFDDikrK7uGSV32mQyTwuMiw5m3t/drXN0QAdqDg4PlYsMNDAz8hBDWaTKZ/nLlfobJToB7iAaeImYqx62trd/n5OT0HR4eOjlEKGLaI8DNtLQ0HzHg9vf3rSUlJe3l5eWzXMcyTJvkowzIxeLxaRISbnNzczs3N/e+Xq//w53xiYmJAeQOCXAQdev7QsLhtC5gS3uQgDrctQGmICr4aYt/8PLykiHN8eULhtzyBAnDIAr2B3zgiAWFPi3esAfTjnhERTUfOJvNZq+trb1fVFQ04nQ6ef1RhuURsbF+sBV7rqGi2s10/Tcku/eam5uX+e4CCqdLxMK0SJ4lrNQreazT6eK5GlxaWjJptdp7fX19O0I8v93d3cTwI9u/+W8kuQNHGl5VVeVyYO/o6DAg93PZ+Z4nCId+xICvn7+sLqayswxFdNdFV3bUZTAajfnIzr/G5TdnFu6oC8AYeaGFO+Cyw8LCXijc/w+Qso0H1PqIiooaFhuS4JAzsq2PD6CH53W36IaPMOAQkFm09CJvaybm+pPmfB7urPYbdZmuYclXYKCgoqLCX2g4xGd/so05Vpmm0b67DcxSakdQAxOxVW82m218/VxPTw/bwPwKetfdBiYr1AFNh8EnODw3EGeTAco5+6ExNJZskC3JP034u+fWNm400akrSk30Y5SrW5j0tIk+NjZ2gAzm1DWpVCp5amrqaRMdeV2AWq2mJjo1CKiJ3iIRoYn+vLCvIaj6j5L8+xqCDZX0GLCvIQxMXB2WuPEa4m8BBgDXxE/mIU7+4wAAAABJRU5ErkJggg==) no-repeat;
    background-size: 40px 40px;
    cursor: pointer;
}
</style>
