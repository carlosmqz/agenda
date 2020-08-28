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
            let encodedContactInfo = btoa(JSON.stringify(this.createContactInformationObject()));
            let postUrl = '/agenda/add/'+encodedContactInfo
            console.log(postUrl)
            let response = await fetch(postUrl, {
                 method: 'POST',
                 body: encodedContactInfo
            })
            console.log(await response.json)
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