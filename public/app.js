const app = new Vue({
    el: '#app',
    data:{
        name: '',
        addressName:'',
        addressType: '',
        cp: 0,
        state: '',
        phoneType: '',
        phoneNumber: ''
    },
    methods: {
        saveContact: async function(){
            let postUrl = '/agenda/add'
            let response = await fetch(postUrl, {
                 method: 'POST',
                 headers: {
                     'Content-type': 'application/json'
                 },
                 body: JSON.stringify(this.createContactInformationObject())
            })
            let data = await response.json();
            if(data.error){
                console.log(`Error at saving data: ${data.error} `);
            }else{
                console.log(data.message)
            }
        },
        createContactInformationObject: function(){
            return  {
                name: this.name,
                address:[{
                    addressType: this.addressType,
                    addressName: this.addressName,
                    cp: this.cp,
                    state: this.state
                }],
                phone:[{
                    phoneType: this.phoneType,
                    phoneNumber: this.phoneNumber
                }]
            }
        }
    },
})