<template>
  <ul class="stack">
    <li
      class="stack-item"
      v-for="(item, index) in pages"
      :key="index"
      :style="[transformIndex(index), transform(index)]"
      @touchmove.stop.capture="touchmove"
      @touchstart.stop.capture="touchstart"
      @touchend.stop.capture="touchend($event, index)"
      @touchcancel.stop.capture="touchend($event, index)"
      @mousedown.stop.capture.prevent="touchstart"
      @mouseup.stop.capture.prevent="touchend($event, index)"
      @mousemove.stop.capture.prevent="touchmove"
      @mouseout.stop.capture.prevent="touchend($event, index)"
      @webkit-transition-end="onTransitionEnd(index)"
      @transitionend="onTransitionEnd(index)"
    >
      <img :src="item.avatar" />
      <!-- <div class="stack-info">
        <h2 class="name">{{ item.name }}</h2>
        <p class="tags">
          <span class="sex" :class="item.sex"
            ><i class="iconfont" :class="'icon-' + item.sex"></i>
            {{ item.age }}</span
          >
          <span class="xz">{{ item.starsign }}</span>
        </p>
        <p class="distance">{{ item.distance }}</p>
      </div> -->
    </li>
  </ul>
</template>
<script>
export default {
  // props: {
  //   pages: {
  //     type: Array,
  //     default: {},
  //   },
  // },
  data() {
    return {
      pages: [
        {
          avatar:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/Stag.svg",
        },
        {
          avatar:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/Stag.svg",
        },
      ],
      basicdata: {
        start: {},
        end: {},
      },
      temporaryData: {
        isStackClick: true,
        offsetY: "",
        poswidth: 0,
        posheight: 0,
        lastPosWidth: "",
        lastPosHeight: "",
        lastZindex: "",
        rotate: 0,
        lastRotate: 0,
        visible: 3,
        tracking: false,
        animation: false,
        currentPage: 0,
        opacity: 1,
        lastOpacity: 0,
        swipe: false,
        zIndex: 10,
      },
    };
  },
  computed: {
    // 划出面积比例
    offsetRatio() {
      let width = this.$el?.offsetWidth;
      let height = this.$el?.offsetHeight;
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth);
      let offsetHeight = height - Math.abs(this.temporaryData.posheight);
      let ratio = 1 - (offsetWidth * offsetHeight) / (width * height) || 0;
      return ratio > 1 ? 1 : ratio;
    },
    // 划出宽度比例
    offsetWidthRatio() {
      let width = this.$el.offsetWidth;
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth);
      let ratio = 1 - offsetWidth / width || 0;
      return ratio;
    },
  },
  methods: {
    touchstart(e) {
      if (this.temporaryData.tracking) {
        return;
      }
      // 是否为touch
      if (e.type === "touchstart") {
        if (e.touches.length > 1) {
          this.temporaryData.tracking = false;
          return;
        } else {
          // 记录起始位置
          this.basicdata.start.t = new Date().getTime();
          this.basicdata.start.x = e.targetTouches[0].clientX;
          this.basicdata.start.y = e.targetTouches[0].clientY;
          this.basicdata.end.x = e.targetTouches[0].clientX;
          this.basicdata.end.y = e.targetTouches[0].clientY;
          // offsetY在touch事件中没有，只能自己计算
          this.temporaryData.offsetY =
            e.targetTouches[0].pageY - this.$el.offsetParent.offsetTop;
        }
        // pc操作
      } else {
        this.basicdata.start.t = new Date().getTime();
        this.basicdata.start.x = e.clientX;
        this.basicdata.start.y = e.clientY;
        this.basicdata.end.x = e.clientX;
        this.basicdata.end.y = e.clientY;
        this.temporaryData.offsetY = e.offsetY;
      }
      this.temporaryData.isStackClick = true;
      this.temporaryData.tracking = true;
      this.temporaryData.animation = false;
    },
    touchmove(e) {
      this.temporaryData.isStackClick = false;
      // 记录滑动位置
      if (this.temporaryData.tracking && !this.temporaryData.animation) {
        if (e.type === "touchmove") {
          e.preventDefault();
          this.basicdata.end.x = e.targetTouches[0].clientX;
          this.basicdata.end.y = e.targetTouches[0].clientY;
        } else {
          e.preventDefault();
          this.basicdata.end.x = e.clientX;
          this.basicdata.end.y = e.clientY;
        }
        // 计算滑动值
        this.temporaryData.poswidth =
          this.basicdata.end.x - this.basicdata.start.x;
        this.temporaryData.posheight =
          this.basicdata.end.y - this.basicdata.start.y;
        let rotateDirection = this.rotateDirection();
        let angleRatio = this.angleRatio();
        this.temporaryData.rotate =
          rotateDirection * this.offsetWidthRatio * 15 * angleRatio;
      }
    },
    touchend(e, index) {
      if (this.temporaryData.isStackClick) {
        this.$emit("click", index);
        this.temporaryData.isStackClick = false;
      }
      this.temporaryData.isStackClick = true;
      this.temporaryData.tracking = false;
      this.temporaryData.animation = true;
      // 滑动结束，触发判断
      // 判断划出面积是否大于0.4
      if (this.offsetRatio >= 0.4) {
        // 计算划出后最终位置
        let ratio = Math.abs(
          this.temporaryData.posheight / this.temporaryData.poswidth
        );
        this.temporaryData.poswidth =
          this.temporaryData.poswidth >= 0
            ? this.temporaryData.poswidth + 200
            : this.temporaryData.poswidth - 200;
        this.temporaryData.posheight =
          this.temporaryData.posheight >= 0
            ? Math.abs(this.temporaryData.poswidth * ratio)
            : -Math.abs(this.temporaryData.poswidth * ratio);
        this.temporaryData.opacity = 0;
        this.temporaryData.swipe = true;
        this.nextTick();
        // 不满足条件则滑入
      } else {
        this.temporaryData.poswidth = 0;
        this.temporaryData.posheight = 0;
        this.temporaryData.swipe = false;
        this.temporaryData.rotate = 0;
      }
    },
    nextTick() {
      // 记录最终滑动距离
      this.temporaryData.lastPosWidth = this.temporaryData.poswidth;
      this.temporaryData.lastPosHeight = this.temporaryData.posheight;
      this.temporaryData.lastRotate = this.temporaryData.rotate;
      this.temporaryData.lastZindex = 20;
      // 循环currentPage
      this.temporaryData.currentPage =
        this.temporaryData.currentPage === this.pages.length - 1
          ? 0
          : this.temporaryData.currentPage + 1;
      // currentPage切换，整体dom进行变化，把第一层滑动置最低
      this.$nextTick(() => {
        this.temporaryData.poswidth = 0;
        this.temporaryData.posheight = 0;
        this.temporaryData.opacity = 1;
        this.temporaryData.rotate = 0;
      });
    },
    onTransitionEnd(index) {
      let lastPage =
        this.temporaryData.currentPage === 0
          ? this.pages.length - 1
          : this.temporaryData.currentPage - 1;
      // dom发生变化正在执行的动画滑动序列已经变为上一层
      if (this.temporaryData.swipe && index === lastPage) {
        this.temporaryData.animation = true;
        this.temporaryData.lastPosWidth = 0;
        this.temporaryData.lastPosHeight = 0;
        this.temporaryData.lastOpacity = 0;
        this.temporaryData.lastRotate = 0;
        this.temporaryData.swipe = false;
        this.temporaryData.lastZindex = -1;
      }
    },
    prev() {
      this.temporaryData.tracking = false;
      this.temporaryData.animation = true;
      // 计算划出后最终位置
      let width = this.$el.offsetWidth;
      this.temporaryData.poswidth = -width;
      this.temporaryData.posheight = 0;
      this.temporaryData.opacity = 0;
      this.temporaryData.rotate = "-3";
      this.temporaryData.swipe = true;
      this.nextTick();
    },
    next() {
      this.temporaryData.tracking = false;
      this.temporaryData.animation = true;
      // 计算划出后最终位置
      let width = this.$el.offsetWidth;
      this.temporaryData.poswidth = width;
      this.temporaryData.posheight = 0;
      this.temporaryData.opacity = 0;
      this.temporaryData.rotate = "3";
      this.temporaryData.swipe = true;
      this.nextTick();
    },
    rotateDirection() {
      if (this.temporaryData.poswidth <= 0) {
        return -1;
      } else {
        return 1;
      }
    },
    angleRatio() {
      let height = this.$el.offsetHeight;
      let offsetY = this.temporaryData.offsetY;
      let ratio = -1 * ((2 * offsetY) / height - 1);
      return ratio || 0;
    },
    inStack(index, currentPage) {
      let stack = [];
      let visible = this.temporaryData.visible;
      let length = this.pages.length;
      for (let i = 0; i < visible; i++) {
        if (currentPage + i < length) {
          stack.push(currentPage + i);
        } else {
          stack.push(currentPage + i - length);
        }
      }
      return stack.indexOf(index) >= 0;
    },
    // 非首页样式切换
    transform(index) {
      let currentPage = this.temporaryData.currentPage;
      let length = this.pages.length;
      let lastPage =
        currentPage === 0 ? this.pages.length - 1 : currentPage - 1;
      let style = {};
      let visible = this.temporaryData.visible;
      if (index === this.temporaryData.currentPage) {
        return;
      }
      if (this.inStack(index, currentPage)) {
        let perIndex =
          index - currentPage > 0
            ? index - currentPage
            : index - currentPage + length;
        style["opacity"] = "1";
        style["transform"] =
          "translate3D(0,0," +
          -1 * 60 * (perIndex - this.offsetRatio) +
          "px" +
          ")";
        style["zIndex"] = visible - perIndex;
        if (!this.temporaryData.tracking) {
          style["transitionTimingFunction"] = "ease";
          style["transitionDuration"] = 300 + "ms";
        }
      } else if (index === lastPage) {
        style["transform"] =
          "translate3D(" +
          this.temporaryData.lastPosWidth +
          "px" +
          "," +
          this.temporaryData.lastPosHeight +
          "px" +
          ",0px) " +
          "rotate(" +
          this.temporaryData.lastRotate +
          "deg)";
        style["opacity"] = this.temporaryData.lastOpacity;
        style["zIndex"] = this.temporaryData.lastZindex;
        style["transitionTimingFunction"] = "ease";
        style["transitionDuration"] = 300 + "ms";
      } else {
        style["zIndex"] = "-1";
        style["transform"] =
          "translate3D(0,0," + -1 * visible * 60 + "px" + ")";
      }
      return style;
    },
    // 首页样式切换
    transformIndex(index) {
      if (index === this.temporaryData.currentPage) {
        let style = {};
        style["transform"] =
          "translate3D(" +
          this.temporaryData.poswidth +
          "px" +
          "," +
          this.temporaryData.posheight +
          "px" +
          ",0px) " +
          "rotate(" +
          this.temporaryData.rotate +
          "deg)";
        style["opacity"] = this.temporaryData.opacity;
        style["zIndex"] = 10;
        if (this.temporaryData.animation) {
          style["transitionTimingFunction"] = "ease";
          style["transitionDuration"] =
            (this.temporaryData.animation ? 300 : 0) + "ms";
        }
        return style;
      }
    },
  },
};
</script>

<style lang="less">
.stack {
  width: 100%;
  text-align: center;
  .stack-item {
    width: 300px;
    height: 500px;
    border: 1px solid red;
  }
}
</style>
