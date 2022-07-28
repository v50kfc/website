<script setup lang="ts">
import { ref, onMounted } from "vue";
import source from "../public/source.js";
const isOpen = ref<boolean>(false);
const handleClick = () => {
  if (isOpen.value) {
    activeIndex.value = 0;
  }
  isOpen.value = !isOpen.value;
};
const activeIndex = ref<number>(0);
const handlePrev = () => {
  if (activeIndex.value === 0) return;
  activeIndex.value--;
};
const handleNext = () => {
  if (activeIndex.value === source.length || !isOpen.value) return;
  activeIndex.value++;
};
const handleCopy = async () => {
  const handleCopyText = async (text: string) => {
    try {
      const clipboardObj = navigator.clipboard;
      if (!clipboardObj) return;
      await clipboardObj.writeText(text);
    } catch (error) {
      console.log(error);
    }
  };
  if (!isOpen.value) {
    handleCopyText("v50");
    return;
  }
  handleCopyText(source[activeIndex.value]);
};

onMounted(() => {
  setTimeout(() => {
    handleClick();
  }, 250);
});
</script>

<template>
  <div class="page-content" :class="[isOpen ? 'open-book' : '']">
    <div id="opt">
      <span @click="handleClick">{{ isOpen ? "关闭" : "打开" }} </span>
      <span @click="handlePrev">上一页</span>
      <span @click="handleNext">下一页</span>
      <span @click="handleCopy">copy</span>
    </div>
    <div id="book" class="view-cover">
      <div class="main">
        <div class="book-font">
          <div class="book-cover">
            <h1 class="title">疯狂星期四文案指南</h1>
            <img src="/img/images.jpeg" style="margin: 90px auto 0" alt="" />
            <div class="publisher">https://github.com/v50kfc</div>
          </div>
          <div class="book-cover-back"></div>
        </div>
        <div
          class="book-page"
          v-for="(item, idx) in source"
          :key="idx"
          :style="{ zIndex: source.length - idx }"
          :class="{ active: idx < activeIndex }"
        >
          <div id="page-1" class="page">
            <p>
              {{ item }}
            </p>
          </div>
          <div class="page-number">- {{ idx + 1 }} -</div>
        </div>
        <div class="book-back">
          <div class="description">
            <p>
              <!-- {{ source[source.length - 3] }} -->
            </p>
            <!-- <p class="txt-right">-- kfc</p> -->
          </div>
          <div class="isbn">
            <img
              src="http://www.bluesdream.com/case/css3/3d-book-showcase/images/isbn.png"
            />
          </div>
        </div>
        <div class="book-bone"></div>
        <div class="book-top"></div>
        <div class="book-right"></div>
        <div class="book-bottom"></div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
body {
  line-height: normal;
}
.page-content {
  margin: 0 auto;
  height: calc(100vh - var(--vp-nav-height));
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#book {
  width: 420px;
  position: relative;
  transition-duration: 0.5s;
  perspective: 2000px;
}
.main {
  width: 420px;
  height: 560px;
  color: #92684f;
  position: relative;
  transform-style: preserve-3d;
  transition-duration: 0.5s;
  /* transform: rotate3d(0, 1, 0, 180deg); */
  /* transform: rotate3d(12, 1, 1, 25deg); */
  /* transform: rotate3d(0, 1, 0, -40deg); */
}

.book-font {
  width: 420px;
  height: 560px;
  position: absolute;
  top: 0;
  bottom: 0;
  font-size: 15px;
  text-align: center;
  text-shadow: 0 2px 0 rgba(30, 35, 45, 1);
  box-shadow: inset 3px 0 10px rgba(0, 0, 0, 0.1); /* 给书本添加光照阴影 */
  z-index: 10;
  transform-style: preserve-3d;
  transform-origin: 0% 50%;
  transition-duration: 0.5s;
  transform: translate3d(0, 0, 25px);
}
.book-cover {
  width: 420px;
  height: 560px;
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #29303a;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
.book-cover-back {
  width: 420px;
  height: 560px;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #29303a;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transform: rotate3d(0, 1, 0, -180deg);
}
.title {
  margin: 70px 0 25px 0;
  font-size: 38px;
}
.author {
  height: 20px;
  font-size: 20px;
}
.publisher {
  width: 100%;
  position: absolute;
  bottom: 22px;
}

.book-page {
  width: 415px;
  height: 550px;
  line-height: 20px;
  position: absolute;
  top: 5px;
  /* z-index: 9; */
  box-shadow: inset 3px 0 10px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  transform: translate3d(0, 0, 24px);
  transform-origin: 0% 50%;
  transition-duration: 0.5s;
  &.active {
    transform: translate3d(0, 0, 24px) rotate3d(0, 1, 0, -150deg);
  }
}
.page {
  height: 500px;
  margin: 30px 40px;
  overflow: hidden;
}
.book-page h3 {
  font-size: 14px;
  text-align: center;
  margin-bottom: 14px;
}
.book-page p {
  font-size: 16px;
  margin-bottom: 14px;
}
.page-number {
  width: 100%;
  font-size: 13px;
  text-align: center;
  position: absolute;
  bottom: 10px;
}
.book-back {
  width: 420px;
  background: #29303a;
  position: absolute;
  top: 0;
  bottom: 0;
  color: white;
  transform: rotate3d(0, 1, 0, -180deg) translate3d(0, 0, 25px);
  z-index: 8;
}
.book-back .description {
  font-size: 14px;
  line-height: 20px;
  margin-top: 50px;
  padding: 10px 20px 10px 30px;
  background: rgba(255, 255, 255, 0.1);
}
.book-back p {
  padding: 5px 0;
}
.isbn {
  position: absolute;
  bottom: 20px;
  left: 30px;
}
.book-bone {
  width: 50px;
  background: #29303a;
  box-shadow: 1px 0 0 #29303a, -1px 0 0 #29303a; /* 旋转的时候 拼接处隐隐约约会有个缝隙 所以加上个阴影来填补它 */
  position: absolute;
  top: 0;
  bottom: 0;
  left: -25px;
  transform: rotate3d(0, 1, 0, -90deg);
}
.book-bone h2 {
  width: 530px;
  height: 50px;
  line-height: 50px; /* 对应关系-1 */
  font-size: 14px;
  text-align: right;
  padding: 0 15px;

  transform-origin: 0 0;

  transform: rotate(90deg) translateY(-50px);
}
.book-bone span {
  font-size: 14px;
  padding-right: 20px;
}

.book-cover:after,
.book-back:after {
  content: "";
  width: 3px;
  position: absolute;
  top: 0;
  left: 10px;
  bottom: 0;
  background: rgba(0, 0, 0, 0.06);
  box-shadow: 1px 0 3px rgba(255, 255, 255, 0.1);
}
.book-page,
.book-top,
.book-right,
.book-bottom {
  background: #eeefe9;
}
.book-right {
  width: 50px;
  height: 550px;
  position: absolute;
  top: 5px;
  right: -20px;
  box-shadow: 0 1px 0 #eeefe9, 0 -1px 0 #eeefe9;

  transform: rotate3d(0, 1, 0, 90deg);
}
.book-top {
  width: 415px;
  height: 50px;
  position: absolute;
  top: -20px;
  left: 0;
  transform: rotate3d(1, 0, 0, 90deg);
}
.book-bottom {
  width: 415px;
  height: 50px;
  position: absolute;
  bottom: -20px;
  left: 0;
  transform: rotate3d(1, 0, 0, -90deg) translate3d(0, 0, 0);
}
.book-right,
.book-top,
.book-bottom {
  backface-visibility: hidden;
}
.view-cover:hover .main {
  /* transform: rotate3d(0, 1, 0, -40deg); */
}
.view-back .main {
  transform: rotate3d(0, 1, 0, 180deg);
}
.view-back:hover .main {
  transform: rotate3d(0, 1, 0, 140deg);
}

.open-book {
  .view-cover {
    transform: translateX(220px);
  }
  .book-font {
    transform: translate3d(0, 0, 25px) rotate3d(0, 1, 0, -160deg);
  }
}
.open-book:hover .main {
  /* transform: rotate3d(1, 1, 0, 15deg); */
}
.view-rotate .main {
  transition-duration: 5s;
  transform: rotate3d(0, 1, 0, 180deg);
}
/* .view-rotate:hover .main {
  transition-duration: 8s;
  transform: rotate3d(0, 1, 0, -360deg);
} */

#opt {
  text-align: center;
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  border-radius: 6px;
  display: flex;
  top: 8%;
  right: 6%;
  z-index: 2;
  & span {
    cursor: pointer;
    margin: 5px;
    padding: 5px;
    border-radius: 6px;
    // &:hover {
    //   background-color: #2e2e2e;
    // }
  }
}
</style>
