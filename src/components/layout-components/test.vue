<template>
  <div class="body">
    <button style="display:none;" @click="zoomIn" id="zoomin_b"></button>
      <button style="display:none;" @click="zoomOut" id="zoomout_b"></button>

      <div id="map">
        
      </div>
      <!--MENU ITEM-->
      <AdminLogin/>
      <!--MENU ITEM-->

      <!--MENU ITEM-->
      <MenuItem/>
      <!--MENU ITEM-->

      <!--REGISTER BUILDING-->
      <RegisterBuilding @registered="buildingRegistered"/>
      <!--REGISTER BIOLDING-->

      <!--BUILDING LIST -->
      <BuildingList @buildingRemoved="removeMarker"/>
      <!--BUILDING LIST-->
      <div class="faan-naia">
        <img src="@/assets/faan_logo.png" class="logo">
      </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import MenuItem from '@/components/MenuItem.vue';
  import RegisterBuilding from '@/components/RegisterBuilding.vue';
  import BuildingList from '@/components/BuildingList.vue'
  import AdminLogin from '@/components/AdminLogin.vue'
  import { useDataStore } from '@/stores/data'
  import { Loader } from '@googlemaps/js-api-loader';

  export default{
    setup(){
      const dataStore = useDataStore()
      //const center = { lat:9.0093584, lng:7.2747674}  //NAIA 
      const center = { lat:6.5818, lng:3.3211} //MIA
      const loader = new Loader({
        apiKey: 'AIzaSyCKVpGwIytief6zninDbp3v9UbocQorI7Q',
        version:'weekly',
        libraries:['places']
      });
      return { center, loader, dataStore}
    },
    data: () => ({
       markers:[],
       listeners:[],
       maplistener:undefined,
       zoom:16,
       map:undefined,
       svg :'<svg width="28" height="52" viewBox="0 0 48 72" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.94341 44.1606V41.1606C7.99412 37.3154 8.66305 33.5007 9.92665 29.8506V29.8506C13.152 20.3006 19.9472 11.1606 27.8071 6.85065C32.807 4.08065 37.3685 3.74065 40.8652 5.40065L33.9865 1.61065C32.2903 0.53898 30.2981 -0.0217522 28.2664 0.000645738C27.9455 -0.00237374 27.6248 0.0143284 27.3061 0.0506469C26.9721 0.0506469 26.6381 0.110646 26.2623 0.160646C25.9108 0.199528 25.5621 0.259648 25.2185 0.340646C24.8659 0.413205 24.5175 0.503328 24.1747 0.610646C23.4379 0.818456 22.7161 1.07233 22.014 1.37065C21.6487 1.52065 21.2833 1.70065 20.9075 1.87065C20.5318 2.04065 20.156 2.25065 19.7907 2.45065C8.88284 8.49065 0 23.8506 0 36.8506L0 39.8506C0 52.7806 18.1519 66.8506 18.1519 66.8506L25.4586 70.8506C25.33 70.7694 25.2079 70.6791 25.0932 70.5807C19.7176 65.6707 7.94341 54.1106 7.94341 44.1606ZM29.6129 16.9706C29.6769 17.3011 29.7187 17.6351 29.7382 17.9706C29.7382 18.0906 29.7382 18.2006 29.7382 18.3206C29.7488 18.5172 29.7488 18.7141 29.7382 18.9106C29.7382 24.9706 25.302 32.3506 19.8115 35.3806L19.2166 35.6906C19.0182 35.7906 18.8199 35.8706 18.632 35.9506L18.0579 36.1806H17.9953C18.8512 40.8206 22.8804 42.4407 27.7654 39.7607C33.2454 36.7607 37.6816 29.3406 37.6816 23.2806C37.7234 17.9106 34.2266 15.3606 29.6129 16.9706Z" fill="#43A047"/><path opacity="0.3" d="M7.94341 44.1606V41.1606C7.99412 37.3154 8.66305 33.5007 9.92665 29.8506V29.8506C13.152 20.3006 19.9472 11.1606 27.8071 6.85065C32.807 4.08065 37.3685 3.74065 40.8652 5.40065L33.9865 1.61065C32.2903 0.53898 30.2981 -0.0217522 28.2664 0.000645738C27.9455 -0.00237374 27.6248 0.0143284 27.3061 0.0506469C26.9721 0.0506469 26.6381 0.110646 26.2623 0.160646C25.9108 0.199528 25.5621 0.259648 25.2185 0.340646C24.8659 0.413205 24.5175 0.503328 24.1747 0.610646C23.4379 0.818456 22.7161 1.07233 22.014 1.37065C21.6487 1.52065 21.2833 1.70065 20.9075 1.87065C20.5318 2.04065 20.156 2.25065 19.7907 2.45065C8.88284 8.49065 0 23.8506 0 36.8506L0 39.8506C0 52.7806 18.1519 66.8506 18.1519 66.8506L25.4586 70.8506C25.33 70.7694 25.2079 70.6791 25.0932 70.5807C19.7176 65.6707 7.94341 54.1106 7.94341 44.1606Z" fill="white"/><path opacity="0.5" d="M29.6129 16.9706C29.6769 17.3011 29.7187 17.6351 29.7382 17.9706C29.7382 18.0906 29.7382 18.2006 29.7382 18.3206C29.7488 18.5172 29.7488 18.7141 29.7382 18.9106C29.7382 24.9706 25.302 32.3506 19.8115 35.3806L19.2166 35.6906C19.0182 35.7906 18.8199 35.8706 18.632 35.9506L18.0579 36.1806H17.9953C18.8512 40.8206 22.8803 42.4407 27.7654 39.7607C33.2454 36.7607 37.6816 29.3406 37.6816 23.2806C37.7234 17.9106 34.2266 15.3606 29.6129 16.9706Z" fill="white"/><path d="M47.65 19.2506C47.65 6.32065 38.7672 0.750648 27.8176 6.82065C16.868 12.8906 7.98516 28.2806 7.98516 41.2106V44.2106C7.98516 54.2106 19.7594 65.7207 25.1767 70.5107C25.4828 70.7739 25.8481 70.9659 26.2442 71.0717C26.6404 71.1775 27.0567 71.1943 27.4607 71.1208C27.8648 71.0472 28.2456 70.8853 28.5737 70.6477C28.9017 70.41 29.1681 70.1031 29.352 69.7506C34.0283 60.5806 47.65 32.9506 47.65 22.2406V19.2506ZM27.8176 39.7607C22.3376 42.7607 17.8909 40.3406 17.8909 34.2706C17.8909 28.2006 22.3167 20.8506 27.7967 17.8506C33.2767 14.8506 37.7233 17.2706 37.7233 23.3406C37.7233 29.4106 33.2767 36.7307 27.7967 39.7607H27.8176Z" fill="#00c853"/><path d="M47.65 19.2506C47.65 6.32065 38.7672 0.750648 27.8176 6.82065C16.868 12.8906 7.98516 28.2806 7.98516 41.2106V44.2106C7.98516 54.2106 19.7594 65.7207 25.1767 70.5107C25.4828 70.7739 25.8481 70.9659 26.2442 71.0717C26.6404 71.1775 27.0567 71.1943 27.4607 71.1208C27.8648 71.0472 28.2456 70.8853 28.5737 70.6477C28.9017 70.41 29.1681 70.1031 29.352 69.7506C34.0283 60.5806 47.65 32.9506 47.65 22.2406V19.2506ZM27.8176 39.7607C22.3376 42.7607 17.8909 40.3406 17.8909 34.2706C17.8909 28.2006 22.3167 20.8506 27.7967 17.8506C33.2767 14.8506 37.7233 17.2706 37.7233 23.3406C37.7233 29.4106 33.2767 36.7307 27.7967 39.7607H27.8176Z" fill="#00c853"/></svg>'
     }),
    name: 'HomeView',
      head:{
        title:'NAIA Landmark'
      },
      components: {
        MenuItem,
        RegisterBuilding,
        BuildingList,
        AdminLogin,
      },
    methods:{
      zoomIn(){
          if(this.zoom<26){
            this.zoom +=1;
            this.map.setZoom(this.zoom);
          }
        },
        zoomOut(){
          if(this.zoom>17){
            this.zoom -=1;
            this.map.setZoom(this.zoom);
          }
        },
        getSvg(){
          return {
            url:'data:image/svg+xml;charset=UTF-8;base64,' + window.btoa(this.svg), //scaledSize:this.$refs.map.Size(50,50)
          }
        },
        extractLatLong(latlng){
          let nstring = latlng.substring(1,latlng.length-1);
          let l = nstring.split(',');
          return {lat:parseFloat(l[0]) , lng:parseFloat(l[1])}
       },
      addMapListener(){
        this.maplistener=this.map.addListener('click',this.mapListener);
      },
      mapListener(event){
        if(this.dataStore.token){
            //ADMIN MODE IS ACTIVE
            //SAVE THE CURRENT LOCATION 
            window.localStorage.setItem('location', event.latLng.toString());
            document.getElementsByClassName('bu')[0].style.display='block';
            document.getElementsByClassName('latlong')[0].innerHTML=event.latLng.toString();
            }
      },
      buildingRegistered(data){
        this.drawMarker(data.title,this.extractLatLong(data.pos),data.slug);
      },
      removeMarker(index){
        console.log('Deleting from '+index+' Total markers '+this.markers.length)
        this.listeners[index]=null;
        this.markers[index].setMap(null);
        this.markers[index]=null;
        this.markers.splice(index,1);
      },
      //DRAW MARKER AT SPECIFIC LOCATION 
        drawMarker(title,pos,slug){
          const marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          title:title,
          icon:{url:'data:image/svg+xml;charset=UTF-8;base64,' + window.btoa(this.svg), scaledSize:new google.maps.Size(50,50)},
          optimized:false
          });
          this.markers[this.markers.length]=marker;
       
         let ls = marker.addListener('click',()=>{
            this.loadBuildingData(slug)
          });
          this.listeners[this.listeners.length]=ls;
        },
        loadBuildingData(slug){
          if(this.dataStore.token && this.dataStore.permission==='VIEW_EDIT'){
              this.$router.push('/editbuilding/'+slug);
            }
          else{
          this.dataStore.show=true;
          this.dataStore.message='You do not have permission to view or edit this data';
          this.dataStore.success=false;
          this.dataStore.error=true;
          }
        },
        fetchBuildings() {
          axios({
            url:this.dataStore.api+'/getBuildings',
              method:'get',
              headers:{
                'Access-Control-Allow-Origin':'*',
                'Accept':'application/json',
                'Authorization':'Bearer '+this.dataStore.token

              }
          }).then((response)=>{
            const res = response.data;
            if(!res.error){
              this.dataStore.buildings = res.data;
              for(let i=0; i<res.data.length; i++){
                this.drawMarker(res.data[i].name,this.extractLatLong(res.data[i].cordinates),res.data[i].slug)
              }
              //useBuildingxStore.buildings=res.data;
            }
          }).catch((error)=>{
            this.buildings=[]
            throw error;
          })
        },
    },
    mounted(){

      let options={
        center:this.center,
        zoom:this.zoom,
        minZoom:this.zoom-2,
        maxZoom:this.zoom+4,
       // restriction:{latLngBounds:{north:-40 , south:-40, east:160, west:100}},
        mapTypeControl:false , 
        fullscreenControl:false, 
        zoomControl:false,
        mapTypeId:'satellite'
      };
      this.loader.loadCallback(e=>{
        if(e){
          this.dataStore.show=true;
          this.dataStore.error=true;
          this.dataStore.message="Map could not be loaded, reload page"
          console.log(e);
        }else{
          this.map = new google.maps.Map(document.getElementById('map'),options);
          this.addMapListener();
          this.fetchBuildings();
          this.dataStore.map = this.map;
        }
      });
    },
    unmounted(){
      this.maplistener.remove();
      //this.listeners=[];
      for (var i = 0; i<this.markers.length;  i++) {
        google.maps.event.removeListener(this.listeners[i]);
        this.markers[i]=null
      }
    }
  }
</script>
<style scoped>
*{
  padding:0px;
  margin:0px;
}
.body{
  position:relative;
}
.faan-naia{
  width:110px;
  height:50px;
  background:#fff;
  position: fixed;
  color:white;
  z-index: 6;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: 'RobotoBold';
}
.logo{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
#map{
    width:100%;
    height:100vh;
}
/MOBILE PHONES/
@media screen and (max-width: 620px){
  .faan-naia{
    top:0;
    left:35%;
  }
}

@media screen and (min-width: 640px){
  .faan-naia{
    top:0px;
    left:45%;
  }
}
</style>