 
fetch("https://procanecer.herokuapp.com/api/v1/doctor/alldoctor").then((result)=>{
    let cdata=result.json();
    return cdata;
})
    //return data.json();
 .then((cdata)=>{
   
    
    let values=cdata.pop()
    
    console.log(values.name)

 p=document.getElementById("photo1");
 p.innerHTML=`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="${values.url}",alt="User" class="media-object img-circle thumb64" style="width: 90px; height: 300px;">`
 
 z = document.getElementById("doctor");
        
 z.innerHTML=` <div class="media-body media-middle">
                <h4 class="media-heading text-white">${values.name}</h4>
                <span class="ng-scope editable"><a href="" class="ng-binding">${values.email}</a></span>
                </div>
                </div>
                </div>
                <div class="container-fluid ng-scope">
                <div class="row">
                <!-- Left column-->
                <div class="col-md-7 col-lg-8">
                <form class="card ng-pristine ng-valid" style="width: 1000px;">
                    <h5 class="card-heading pb0">
                        About
                    </h5>
                    <div class="card-body">
                    <p class="ng-scope ng-binding editable">${values.about}</p>
                    </div>
                    <div class="card-divider"></div>
                    <div class="card-offset">
                    <div class="card-offset-item text-right">
                        <button type="button"  class="btn-raised btn btn-warning btn-circle btn-lg"><em class="fa fa-edit"></em></button>
                        <button type="submit" class="btn-raised btn btn-success btn-circle btn-lg ng-hide"><em class="fa fa-check"></em></button>
                    </div>
                    </div>
                    <h5 class="card-heading pb0">Contact Information</h5>
                    <div class="card-body">
                    <table class="table table-striped">
                        <tbody>
                        <tr>
                        <td><em class="ion-document-text icon-fw mr"></em>Specialization</td>
                        <td class="ng-binding">${values.specialize}</td>
                    </tr>
                    <tr>
                        <td><em class="ion-ios-body icon-fw mr"></em>Price detection</td>
                        <td><span class="ng-scope ng-binding editable">${values.price}</span></td>
                    </tr>
                    <tr>
                        <td><em class="ion-android-home icon-fw mr"></em>Address</td>
                        <td><span class="ng-scope ng-binding editable">${values.address}</span></td>
                    </tr>
                    <tr>
                        <td><em class="ion-ios-telephone icon-fw mr"></em>Phone</td>
                        <td><span class="ng-scope ng-binding editable">${values.phone}</span></td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div class="card-divider"></div>
            </form>
            </div>
            </div>
            </div>;
 `

  });