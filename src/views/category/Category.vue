<template>
<div>
  <div class="wrapper">
    <ul class="content">
      <li>列表类1</li>
      <li>列表类2</li>
      <li>列表类3</li>
      <li>列表类4</li>
      <li>列表类5</li>
      <li>列表类6</li>
      <li>列表类7</li>
      <li>列表类8</li>
      <li>列表类9</li>
      <li>列表类10</li>
      <li>列表类11</li>
      <li>列表类12</li>
      <li>列表类13</li>
      <li>列表类14</li>
      <li>列表类15</li>
      <li>列表类16</li>
      <li>列表类17</li>
      <li>列表类18</li>
      <li>列表类19</li>
      <li>列表类20</li>
      <li>列表类21</li>
      <li>列表类22</li>
      <li>列表类23</li>
      <li>列表类24</li>
      <li>列表类25</li>
      <li>列表类26</li>
      <li>列表类27</li>
      <li>列表类28</li>
      <li>列表类29</li>
      <li>列表类30</li>
      <li>列表类31</li>
      <li>列表类32</li>
      <li>列表类33</li>
      <li>列表类34</li>
      <li>列表类35</li>
      <li>列表类36</li>
      <li>列表类37</li>
      <li>列表类38</li>
      <li>列表类39</li>
      <li>列表类40</li>
      <li>列表类41</li>
      <li>列表类42</li>
      <li>列表类43</li>
      <li>列表类44</li>
      <li>列表类45</li>
      <li>列表类46</li>
      <li>列表类47</li>
      <li>列表类48</li>
      <li>列表类49</li>
      <li>列表类50</li>
      <li>列表类51</li>
      <li>列表类52</li>
      <li>列表类53</li>
      <li>列表类54</li>
      <li>列表类55</li>
      <li>列表类56</li>
      <li>列表类57</li>
      <li>列表类58</li>
      <li>列表类59</li>
      <li>列表类60</li>
      <li>列表类61</li>
      <li>列表类62</li>
      <li>列表类63</li>
      <li>列表类64</li>
      <li>列表类65</li>
      <li>列表类66</li>
      <li>列表类67</li>
      <li>列表类68</li>
      <li>列表类69</li>
      <li>列表类70</li>
      <li>列表类71</li>
      <li>列表类72</li>
      <li>列表类73</li>
      <li>列表类74</li>
      <li>列表类75</li>
      <li>列表类76</li>
      <li>列表类77</li>
      <li>列表类78</li>
      <li>列表类79</li>
      <li>列表类80</li>
      <li>列表类81</li>
      <li>列表类82</li>
      <li>列表类83</li>
      <li>列表类84</li>
      <li>列表类85</li>
      <li>列表类86</li>
      <li>列表类87</li>
      <li>列表类88</li>
      <li>列表类89</li>
      <li>列表类90</li>
      <li>列表类91</li>
      <li>列表类92</li>
      <li>列表类93</li>
      <li>列表类94</li>
      <li>列表类95</li>
      <li>列表类96</li>
      <li>列表类97</li>
      <li>列表类98</li>
      <li>列表类99</li>
      <li>列表类100</li>
    </ul>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Category",
  data(){
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector('.wrapper'),{

    })
  }
}
</script>

<style scoped>
.wrapper {
  height: 300px;
  background-color: red;
  overflow: scroll;
}
</style>
