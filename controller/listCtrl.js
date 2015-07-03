app.controller('listCtrl', function($http,$filter,$timeout,$location,$stateParams,$scope,TodosService, usSpinnerService) {

    $http.get('http://79.123.48.77:5000/getFormList',{
                params: { formIndex: $stateParams.todo }
            }).
              success(function(data, status, headers, config) {
                if(data.success)
                {
//                    $scope.empty=true;
                    $scope.list=data.list;
                    if(data.list[0]==null)
                        $scope.empty=true;
                    else
                        $scope.empty=false;
                    console.log(list);
                }
              });
    $scope.editForm = function(_id,index) {
        console.log(_id);
        $http.get('http://79.123.48.77:5000/getForm',{
                params: { _id: _id }
            }).
              success(function(data, status, headers, config) {
                console.log(data.form)
                $scope.submitted = data.form.submitted;
            
                if(data.success)
                {
                    data=data.form.data;
                    console.log(data.length)
                    console.log(data)
//                    for( i=0; i<data.length;i++)
//                    {
//                        console.log(data[i])
//                        if (data[i] != "")
//                            data[i].date = new Date(data[i].date);
//                        console.log(data[i].date);
//                    }
                    console.log(data);
                    angular.copy(data,TodosService.form[index] );
                    TodosService.formId = _id;
                    console.log($scope.submitted);
                    if($scope.submitted == null){
                        $scope.submitted = TodosService.submit[$stateParams.todo]
                        console.log('null')
                        console.log($scope.submitted);
                    }
                    else{
                        TodosService.submitted[$stateParams.todo] = $scope.submitted;
                        console.log($stateParams.todo);
                    }
                    $scope.$emit('updateEvent', 'args');
                    TodosService.editStatus=false;
                    TodosService.editFormid=_id;
                    $location.path("/todos/"+index);
                }
              });
    }
    $scope.emailForm = function(_id,index) {
        usSpinnerService.spin('spinner-1');
        $http.get('http://79.123.48.77:5000/getForm',{
                params: { _id: _id }
            }).
              success(function(data, status, headers, config) {
                if(data.success)
                {
                    angular.copy(data.form.data,TodosService.form[index] );
                    $scope.form=data.form.data;
                    console.log(data.form);
if(index==0)
{
    console.log("in one");
    var docDefinition = {
       pageSize: 'A4',
       header: function(currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element
           if(currentPage==1)
           {
            return { text: 'ERDT Feedback / Supplementary Evidence Sheet', style: 'header', margin: [0,8] };
           }
           else if(currentPage==2)
           {
            return { text: 'COMPETENCY ASSESSMENT', style: 'header', margin: [0,8] };
           }
            return { text: '', style: 'header' , margin: [0,8] };
      },
      footer: function(currentPage, pageCount) { return {text: currentPage.toString(),alignment:'center' }},
       content: [
            {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ { text: 'COURSE:', style: 'small'},
                   {text:'ERDT  REFRESHER',colSpan:7, style: 'small' },'','','','','','' ],
                  [ { text: 'NAME:', style: 'small'},
                   $scope.get('form[0].name'),
                   { text: 'NUMBER:', style: 'small'},$scope.get('form[0].number'),
                   { text:'INSTRUCTOR', style: 'small'},{text:$scope.get('form[0].instructor'),colSpan:3}
                   ,'','' ],
                  [ { text: 'VEHICLE:', style: 'small'},$scope.get('form[0].vehicle'),
                     { text: 'DATE:', style: 'small'},$scope.get('form[0].date'),
                     { text:'DAY:', style: 'small'},$scope.get('form[0].day0'),
                     { text:'OF:', style: 'small'},$scope.get('form[0].day1')]
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', '*', '*', '*','*' ,'*','*', '*', '*','*' ,'*','*'  ],
                body: [
                  [ {text:'ERDT ELEMENTS COVERED',colSpan:16,fillColor: '#ffa07a', style: 'small' }, '','','','','','','','','','','','','','','' ],
                  [ {text:'1.1',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c11'),
                   {text:'1.2a',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c12a'),
                   {text:'1.2b',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c12b'),
                   {text:'1.3',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c13'),
                   {text:'1.4',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c14'),
                   {text:'1.5',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c15'),
                   {text:'1.6',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c16'),
                   {text:'K&U\nA&B',fillColor: '#ffa07a', style: 'small'},
                   {image:'tick',width:12,alignment:'center'}  ],
                  [ {text:'INSTRUCTOR COMMENTS AND SESSION OUTLINE',colSpan:16,fillColor: '#ffa07a', style: 'small' }, '','','','','','','','','','','','','','','' ],
                    [ {text:'The course was introduced and aims and objectives. Were explained, licence checks completed and copies kept on file.\n'
+'Completion of red kite online assessment covering road craft, driver’s responsibilities, and highway code confirmed and results noted.\n\n'

+'Lecture session covering roadcraft elements: system of vehicle control, limit points, cornering, observation and skid control, and underpinned by a Q & As.\n'
+'Session used to reinforce & confirm students K & U of organisational policy and directives including red traffic light policy, relevant road traffic legislation.\n'
+'Speed, exemptions, motorway procedures, and drivers responsibilities\n'
+'Training vehicle was introduced and knowledge of vehicle checks confirmed through observation and Q &A. (1.1 & 1.2a)\n'
+'Following a short familiarisation drive in the vehicle 1.1 was assessed through direct observation.\n'
+'Elements 1.2a, 1.3, 1.4 were carried out during the rest of the day taking in all types of routes.\n'
+'K & U in element 1. 5 was done by lecture and underpinned by Q & As. And monitored through direct observation during the practical drives.\n'
+'Attitudes and behaviour monitored throughout the day by direct observation',colSpan:16,style:'paragraph' }, '','','','','','','','','','','','','','','' ],
                    [ {text:'AGREED DEVELOPMENT POINTS / TRAINING PLAN TO ACHIEVE COMPETENCE',colSpan:16,fillColor: '#ffa07a' }, '','','','','','','','','','','','','','','' ],
                    [ {text:$scope.get('form[1].agreedPoints'),colSpan:16, style: 'small' }, '','','','','','','','','','','','','','','' ],
                    [ {text:'CANDIDATE COMMENTS',colSpan:16,fillColor: '#ffa07a', style: 'small' }, '','','','','','','','','','','','','','','' ],
                    [ {text:$scope.get('form[1].candidateComments'),colSpan:16  }, '','','','','','','','','','','','','','','' ],
                    [{text:'INSTRUCTOR SIGN:',style:'subheader',margin: [0,0,5,0],colSpan:4}, '','','',{image:$scope.getImage('form[1].instructorSign'),colSpan:4,width: 70},'','','',{text:'CANDIDATE SIGN:',style:'subheader',margin: [0,0,5,0],colSpan:4 },'','','',{image:$scope.getImage('form[1].candidateSign'),colSpan:4,width: 70},'','','' ],
                ]
              }
            },
           {text:'Demonstrate basic driving skills',alignment:'center',pageBreak: 'before',},
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','auto' ,'*','*' ],
                body: [
                  [ 'NAME:',$scope.get('form[2].name'), 'NUMBER:',$scope.get('form[2].number'), 'INSTRUCTOR',$scope.get('form[2].instructor') ],
                  [ 'VEHICLE:',$scope.get('form[2].vehicle'), 'DATE:',{text:$scope.get('form[2].date'),colSpan:3},'','']
                ]
              }
            },
           '\n',
           {text:[{text:'Range statement: –',bold:true},
           {text:'A typical variety of road and traffic conditions within statutory speed limits', style: 'small'}]},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text: '1) Basic vehicle checks', style: 'small'},$scope.getYes('form[3].t11'),'',{text:$scope.get('form[3].feedback'),rowSpan:13, style: 'small'}],
                  [ {text: '2) Familiarise with vehicle controls', style: 'small'} ,$scope.getYes('form[3].t12'),$scope.getNo('form[3].t12'),''],
                    [ {text: '3) Anticipation and planning', style: 'small'} ,$scope.getYes('form[3].t13'),$scope.getNo('form[3].t13'),''],
                    [ {text: '4) Steer the vehicle accurately', style: 'small'} ,$scope.getYes('form[3].t14'),$scope.getNo('form[3].t14'),''],
                    [ {text: '5) Control accelerator, brakes, gears clutch', style: 'small'} ,$scope.getYes('form[3].t15'),$scope.getNo('form[3].t15'),''],
                    [ {text: '6) Progress appropriate to the conditions', style: 'small'} ,$scope.getYes('form[3].t16'),$scope.getNo('form[3].t16'),''],
                    [ {text: '7) Approach and negotiate corners safely', style: 'small'} ,$scope.getYes('form[3].t17'),$scope.getNo('form[3].t17'),''],
                    [ {text: '8) Position the vehicle safely as appropriate', style: 'small'} ,$scope.getYes('form[3].t18'),$scope.getNo('form[3].t18'),''],
                    [ {text: '9) Signals use and response to others', style: 'small'} ,$scope.getYes('form[3].t19'),$scope.getNo('form[3].t19'),''],
                    [ {text: '10) Safe locations to park and manoeuvre', style: 'small'} ,$scope.getYes('form[3].t110'),$scope.getNo('form[3].t110'),''],
                    [ {text: '11) Call on the assistance of others', style: 'small'} ,$scope.getYes('form[3].t111'),$scope.getNo('form[3].t111'),''],
                    [ {text: '12) Reverse, manoeuvre and park the vehicle', style: 'small'}     ,$scope.getYes('form[3].t112'),$scope.getNo('form[3].t112'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a'},$scope.getYes('form[3].t113'),$scope.getNo('form[3].t113'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[3].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[3].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           '\n',
           {text:'Undertake an emergency response drive',style:'subheader'},
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:2},'',{text:'Multi Lane', style: 'small'} ,$scope.getYes('form[4].multilane'), {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'},$scope.getYes('form[4].speed0'),
                       {text:'Day', style: 'small'},$scope.getYes('form[4].location0'),
                       {text:'Urban', style: 'small'},$scope.getYes('form[4].urban'),
                       {text:'Good', style: 'small'},$scope.getYes('form[4].surface0'),
                       {text:'Low', style: 'small'},$scope.getYes('form[4].traffic0'),
                       {text:'Good', style: 'small'},$scope.getYes('form[4].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'},$scope.getYes('form[4].speed1'),
                       {text:'Night', style: 'small'},$scope.getYes('form[4].location1'),
                       {text:'Rural', style: 'small'},$scope.getYes('form[4].rural'),
                       {text:'Poor', style: 'small'},$scope.getYes('form[4].surface1'),
                       {text:'High', style: 'small'},$scope.getYes('form[4].traffic1'),
                       {text:'Poor', style: 'small'},$scope.getYes('form[4].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Is justifiable and should be maintained', style: 'small'} ,$scope.getYes('form[5].t21'),$scope.getNo('form[5].t21'),{text:$scope.get('form[5].feedback'),rowSpan:8}],
                  [ {text:'2) justification for speed exemptions', style: 'small'} ,$scope.getYes('form[5].t22'),$scope.getNo('form[5].t22'),''],
                    [ {text:'3) effective tones (HSDT 1.4 – 3)', style: 'small'} ,$scope.getYes('form[5].t23'),$scope.getNo('form[5].t23'),''],
                    [ {text:'4)  Anticipate, others reaction (HSDT 1.4 – 4)', style: 'small'} ,$scope.getYes('form[5].t24'),$scope.getNo('form[5].t24'),''],
                    [ {text:'5) appropriate progress           \n(HSDT 1.4 – 5)', style: 'small'} ,$scope.getYes('form[5].t25'),$scope.getNo('form[5].t25'),''],
                    [ {text:'6) maintain communication       \n(HSDT 1.4 – 6)', style: 'small'} ,$scope.getYes('form[5].t26'),$scope.getNo('form[5].t26'),''],
                    [ {text:'7) duty of care with exemptions\n(HSDT 1.4 –7)', style: 'small'} ,$scope.getYes('form[5].t27'),$scope.getNo('form[5].t27'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',margin: [2,2,2,2]},$scope.getYes('form[5].t28'),$scope.getNo('form[5].t28'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[5].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[5].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'Drivers licence and restrictions',style:'subheader',pageBreak: 'before'},
           {
              table: {
                widths: [ 'auto', '*', 'auto',100 ],
                body: [
                  [ {text:'Drivers Name',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].dname'), {text:'HRMS',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[6].hrms') ],
                ]
              }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Driving Licence No',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[6].dLicenceNo') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Address',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[6].Address') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'Cat C Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].cExpiry0'),{text:'Cat C+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].cExpiry1'),{text:'Cat C1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].cExpiry2') ],
                    [ {text:'Cat C Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].cCodes0'),{text:'Cat C+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].cCodes1'),{text:'Cat C1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].cCodes2') ],
                    [ {text:'Cat B Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].bExpiry0'),{text:'Cat B+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].bExpiry1'),{text:'Cat D/D1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].bExpiry2') ],
                    [ {text:'Cat B Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].bCodes0'),{text:'Cat B+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].bCodes1'),{text:'Cat D/D1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].bCodes2') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'20.5m Eye Check',fillColor: '#ffa07a',margin:[0,0,3,0]},$scope.getYes('form[6].eyeCheck'),{text:'Photo card expiry check',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.getYes('form[6].cardExpiry'),{text:'Date of Birth',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[6].DOB') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Endorsement and DVLA \ncheck',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[6].dvlaCheck') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           '\n',
           {text:'Drive at high speed on Motorway and multi lane carriageways\n',style:'subheader'},
           {
              table: {
                widths: [ 'auto', '*','auto','*' ],
                body: [
                  [ {text:'VEHICLE:',margin:[5,0,5,0]},$scope.get('form[7].vehicle'),{text:'DATE:',margin:[15,0,15,0]},$scope.get('form[7].date') ]
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:4},'','','', {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'},$scope.getYes('form[8].speed0'),
                       {text:'Multi Lane', style: 'small'},$scope.getYes('form[8].location0'),
                       {text:'Rural', style: 'small'},$scope.getYes('form[8].location2'),
                       {text:'Good', style: 'small'},$scope.getYes('form[8].surface0'),
                       {text:'Low', style: 'small'},$scope.getYes('form[8].traffic0'),
                       {text:'Good', style: 'small'},$scope.getYes('form[8].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'},$scope.getYes('form[8].speed1'),
                       {text:'Motorway', style: 'small'},$scope.getYes('form[8].location1'),
                       {text:'Rural', style: 'small'},$scope.getYes('form[8].location3'),
                       {text:'Poor', style: 'small'},$scope.getYes('form[8].surface1'),
                       {text:'High', style: 'small'},$scope.getYes('form[8].traffic1'),
                       {text:'Poor', style: 'small'},$scope.getYes('form[8].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Joining motorway / multi carriageway road', style: 'small'} ,$scope.getYes('form[9].t31'),'',{text:$scope.get('form[9].feedback'),rowSpan:6, style: 'small'}],
                  [ {text:'2) Adopt the correct lane or position', style: 'small'} ,$scope.getYes('form[9].t32'),'',''],
                    [ {text:'3)  Adjust speed appropriately', style: 'small'} ,$scope.getYes('form[9].t33'),'',''],
                    [ {text:'4) Correct procedure for exiting', style: 'small'} ,$scope.getYes('form[9].t34'),'',''],
                    [ {text:'5) Understand the relevant highway code', style: 'small'} ,$scope.getYes('form[9].t35'),'',''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',margin: [2,2,2,2]},{text:$scope.getYes('form[9].t36'),style:'subheader'},'',''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                  pageBreak: 'after',
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[9].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[9].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'',pageBreak: 'before'},
           {
              table: {
                headerRows: 1,
                  pageBreak: 'before',
                widths: [ '*' ],
                body: [
                  [ {text:'Feedback / Development',style:'subheader',fillColor: '#ffa07a',margin: [5,5,5,5]} ],
                  [ {text:$scope.get('form[10].feedback'),style:'small',rowSpan:10} ],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],[''],[''],['']
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[10].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[10].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
       ],
        images:{
tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABYDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEFAgQGB//EACcQAAEDBAEEAAcAAAAAAAAAAAECAwQABQYRIRITMUEHNUJRcYGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD3V65QY82PCemx25cnq7DC3Uhx3pG1dKd7VocnVcfdL7LyPI3sVsD7kduN82ujR5YB8MtHx3T7P0gH34x+I+EyMlt0ebZktR8ihPtuRZmwhQAVykq1vpHUVa+48ejdYXizeI44xbUr70gkuy5Ht95XKln+fgCkOLWBbY1shNQobKGo7Q0hA5/ZJ5JPkk8kkk0rdpTUxHulKVItTSlKo//Z'
//            tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QB4RXhpZgAATU0AKgAAAAgABgExAAIAAAARAAAAVgMBAAUAAAABAAAAaAMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAOxFESAAQAAAABAAAOxAAAAAB3d3cuaW5rc2NhcGUub3JnAAAAAYagAACxj//bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIABEAEgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP36LhgRz+Vfih/wVl/bh+KP/BVj/goJZfsL/syeJL3w7o2mSPJ8T/GenPIRbRRFRcw+ZEwItoN6xyLuQz3MiQEqoJk8v/b9/wCDl79pr9hP9pj9oL4UfET4a+HvD+r3NgbT4eXGl3Bki0AOJFg1RZpYv+JhHLG4kBZYwssGwxp+8jX7T/4NhP8AgmkP2LP2FLf4heKYZJ/il8b1j8RavcXKE3NlYtueztS7fMSUf7RITgmS4Knd5asVcEzofB//AAa7fsbeGvCWl6befD3W9bu9PtIrabUbrxRqUc9+6IFaeRYp0jV3ILEIiqCxwoGACv0MCAADniiiwrH84H/B7p/ydN8D/wDsU73/ANLBX9Gnh/8A5Aln/wBcI/8A0EUUUIEXKKKKYz//2Q=='
               },
       styles: {
         header: {
           fontSize: 18,
           bold: true,
           alignment:'center' 
         },
           subheader: {
           fontSize: 14,
           bold: true,
           alignment:'center' 
         },
         anotherStyle: {
           italic: true,
           alignment: 'right'
         },
         small: {
            fontSize:10,
         },
         paragraph:{
           fontSize:10,
         }   
       }
    };
    console.log(docDefinition);
}
else if(index==1)
{
    var docDefinition = {
       pageSize: 'A4',
       header: function(currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element
            if(currentPage==1)
           {
            return { text: 'COMPETENCY ASSESSMENT', style: 'header',margin: [0,8] };
           }
            return { text: '', style: 'header',margin: [0,8] };
      },
      footer: function(currentPage, pageCount) { return {text: currentPage.toString(),alignment:'center' }},
       content: [
           {text:'Demonstrate basic driving skills',alignment:'center'},
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','auto' ,'*','*' ],
                body: [
                  [ 'NAME:',$scope.get('form[0].name'), 'NUMBER:',$scope.get('form[0].number'), 'INSTRUCTOR',$scope.get('form[0].instructor') ],
                  [ 'VEHICLE:',$scope.get('form[0].vehicle'), 'DATE:',{text:$scope.get('form[0].date'),colSpan:3},'','']
                ]
              }
            },
           '\n',
           {text:[{text:'Range statement: –',bold:true},
           {text:'A typical variety of road and traffic conditions within statutory speed limits', style: 'small'} ]},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Basic vehicle checks', style: 'small'} ,$scope.getYes('form[1].t11'),'',{text:$scope.get('form[1].feedback'),rowSpan:13}],
                  [ {text:'2) Familiarise with vehicle controls', style: 'small'} ,$scope.getYes('form[1].t12'),$scope.getNo('form[1].t12'),''],
                    [ {text:'3) Anticipation and planning', style: 'small'} ,$scope.getYes('form[1].t13'),$scope.getNo('form[1].t13'),''],
                    [ {text:'4) Steer the vehicle accurately', style: 'small'} ,$scope.getYes('form[1].t14'),$scope.getNo('form[1].t14'),''],
                    [ {text:'5) Control accelerator, brakes, gears clutch', style: 'small'} ,$scope.getYes('form[1].t15'),$scope.getNo('form[1].t15'),''],
                    [ {text:'6) Progress appropriate to the conditions', style: 'small'} ,$scope.getYes('form[1].t16'),$scope.getNo('form[1].t16'),''],
                    [ {text:'7) Approach and negotiate corners safely', style: 'small'} ,$scope.getYes('form[1].t17'),$scope.getNo('form[1].t17'),''],
                    [ {text:'8) Position the vehicle safely as appropriate', style: 'small'} ,$scope.getYes('form[1].t18'),$scope.getNo('form[1].t18'),''],
                    [ {text:'9) Signals use and response to others', style: 'small'} ,$scope.getYes('form[1].t19'),$scope.getNo('form[1].t19'),''],
                    [ {text:'10) Safe locations to park and manoeuvre', style: 'small'} ,$scope.getYes('form[1].t110'),$scope.getNo('form[1].t110'),''],
                    [ {text:'11) Call on the assistance of others', style: 'small'} ,$scope.getYes('form[1].t111'),$scope.getNo('form[1].t111'),''],
                    [ {text:'12) Reverse, manoeuvre and park the vehicle', style: 'small'} ,$scope.getYes('form[1].t112'),$scope.getNo('form[1].t112'),''],
                    [ {text:'13) Hitch/unhitch safely ', style: 'small'} ,$scope.getYes('form[1].t113'),$scope.getNo('form[1].t113'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a'},$scope.getYes('form[1].t114'),$scope.getNo('form[1].t114'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           '\n',
           {text:'Drive on Motorway and multi-lane carriageways carriageways\n',style:'subheader'},
           {
              table: {
                widths: [ 'auto', 100,'auto','*' ],
                body: [
                  [ {text:'VEHICLE:',margin:[5,0,5,0]},$scope.get('form[2].vehicle'),{text:'DATE:',margin:[15,0,15,0]},$scope.get('form[2].date') ],
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:4},'','','', {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[3].speed0'),
                     {text:'Multi Lane', style: 'small'} ,$scope.getYes('form[3].location0'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[3].location2'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[3].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[3].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[3].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[3].speed1'),
                      {text:'Motorway', style: 'small'} ,$scope.getYes('form[3].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[3].location3'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[3].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[3].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[3].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Joining motorway / multi carriageway road', style: 'small'} ,$scope.getYes('form[4].t31'),$scope.getNo('form[4].t31'),{text:$scope.get('form[4].feedback'),rowSpan:6}],
                  [ {text:'2) Adopt the correct lane or position', style: 'small'} ,$scope.getYes('form[4].t32'),$scope.getNo('form[4].t32'),''],
                    [ {text:'3)  Adjust speed appropriately', style: 'small'} ,$scope.getYes('form[4].t33'),$scope.getNo('form[4].t33'),''],
                    [ {text:'4) Correct procedure for exiting', style: 'small'} ,$scope.getYes('form[4].t34'),$scope.getNo('form[4].t34'),''],
                    [ {text:'5) Understand the relevant highway code', style: 'small'} ,$scope.getYes('form[4].t35'),$scope.getNo('form[4].t35'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',margin: [2,2,2,2]},{text:$scope.getYes('form[4].t36'),style:'subheader'},$scope.getNo('form[4].t36'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                  pageBreak: 'after',
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[4].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[4].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
           {text:'Drivers licence and restrictions',style:'subheader',pageBreak: 'before'},
           {
              table: {
                widths: [ 'auto', '*', 'auto',100 ],
                body: [
                  [ {text:'Drivers Name',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].dname'), {text:'HRMS',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].hrms') ],
                ]
              }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Driving Licence No',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].dLicenceNo') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Address',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].Address') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'Cat C Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cExpiry0'),{text:'Cat C+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cExpiry1'),{text:'Cat C1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cExpiry2') ],
                    [ {text:'Cat C Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cCodes0'),{text:'Cat C+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cCodes1'),{text:'Cat C1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cCodes2') ],
                    [ {text:'Cat B Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bExpiry0'),{text:'Cat B+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bExpiry1'),{text:'Cat D/D1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bExpiry2') ],
                    [ {text:'Cat B Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bCodes0'),{text:'Cat B+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bCodes1'),{text:'Cat D/D1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bCodes2') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'20.5m Eye Check',fillColor: '#ffa07a',margin:[0,0,3,0]},$scope.getYes('form[5].eyeCheck'),{text:'Photo card expiry check',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.getYes('form[5].cardExpiry'),{text:'Date of Birth',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].DOB') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Endorsement and DVLA \ncheck',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].dvlaCheck') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'',pageBreak: 'before'},
           {
              table: {
                headerRows: 1,
                  pageBreak: 'before',
                widths: [ '*' ],
                body: [
                  [ {text:'Feedback / Development',style:'subheader',fillColor: '#ffa07a',margin: [5,5,5,5]} ],
                  [ {text:$scope.get('form[6].feedback'),style:'small',rowSpan:10} ],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],[''],[''],['']
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[6].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[6].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
       ],
        images:{ tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABYDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEFAgQGB//EACcQAAEDBAEEAAcAAAAAAAAAAAECAwQABQYRIRITMUEHNUJRcYGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD3V65QY82PCemx25cnq7DC3Uhx3pG1dKd7VocnVcfdL7LyPI3sVsD7kduN82ujR5YB8MtHx3T7P0gH34x+I+EyMlt0ebZktR8ihPtuRZmwhQAVykq1vpHUVa+48ejdYXizeI44xbUr70gkuy5Ht95XKln+fgCkOLWBbY1shNQobKGo7Q0hA5/ZJ5JPkk8kkk0rdpTUxHulKVItTSlKo//Z'
               },
       styles: {
         header: {
           fontSize: 18,
           bold: true,
           alignment:'center' 
         },
           subheader: {
           fontSize: 14,
           bold: true,
           alignment:'center' 
         },
         anotherStyle: {
           italic: true,
           alignment: 'right'
         },
        small: {
            fontSize:10,
         },
        paragraph:{
        fontSize:10,
       }   
       }
    };
}
else if(index==2)
{
    var docDefinition = {
       pageSize: 'A4',
       header: function(currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element
            if(currentPage==1)
           {
            return { text: 'COMPETENCY ASSESSMENT', style: 'header',margin: [0,8] };
           }
            return { text: '', style: 'header' };
      },
      footer: function(currentPage, pageCount) { return {text: currentPage.toString(),alignment:'center' }},
       content: [
           {text:'Demonstrate basic driving skills',style: 'header'},
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','auto' ,'*','*' ],
                body: [
                  [ 'NAME:',$scope.get('form[0].name'), 'NUMBER:',$scope.get('form[0].number'), 'INSTRUCTOR',$scope.get('form[0].instructor') ],
                  [ 'VEHICLE:',$scope.get('form[0].vehicle'), 'DATE:',{text:$scope.get('form[0].date'),colSpan:3},'','']
                ]
              }
            },
           '\n',
           {text:[{text:'Range statement: –',bold:true},
           {text:'A typical variety of road and traffic conditions within statutory speed limits', style: 'small'}]},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Basic vehicle checks', style: 'small'} ,$scope.getYes('form[1].t11'),'',{text:$scope.get('form[1].feedback'),rowSpan:13}],
                  [ {text:'2) Familiarise with vehicle controls', style: 'small'} ,$scope.getYes('form[1].t12'),$scope.getNo('form[1].t12'),''],
                    [ {text:'3) Anticipation and planning', style: 'small'} ,$scope.getYes('form[1].t13'),$scope.getNo('form[1].t13'),''],
                    [ {text:'4) Steer the vehicle accurately', style: 'small'} ,$scope.getYes('form[1].t14'),$scope.getNo('form[1].t14'),''],
                    [ {text:'5) Control accelerator, brakes, gears clutch', style: 'small'} ,$scope.getYes('form[1].t15'),$scope.getNo('form[1].t15'),''],
                    [ {text:'6) Progress appropriate to the conditions', style: 'small'} ,$scope.getYes('form[1].t16'),$scope.getNo('form[1].t16'),''],
                    [ {text:'7) Approach and negotiate corners safely', style: 'small'} ,$scope.getYes('form[1].t17'),$scope.getNo('form[1].t17'),''],
                    [ {text:'8) Position the vehicle safely as appropriate', style: 'small'} ,$scope.getYes('form[1].t18'),$scope.getNo('form[1].t18'),''],
                    [ {text:'9) Signals use and response to others', style: 'small'} ,$scope.getYes('form[1].t19'),$scope.getNo('form[1].t19'),''],
                    [ {text:'10) Safe locations to park and manoeuvre', style: 'small'} ,$scope.getYes('form[1].t110'),$scope.getNo('form[1].t110'),''],
                    [ {text:'11) Call on the assistance of others', style: 'small'} ,$scope.getYes('form[1].t111'),$scope.getNo('form[1].t111'),''],
                    [ {text:'12) Reverse, manoeuvre and park the vehicle', style: 'small'} ,$scope.getYes('form[1].t112'),$scope.getNo('form[1].t112'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a'},$scope.getYes('form[1].t113'),$scope.getNo('form[1].t113'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           '\n',
           {text:'Undertake an emergency response drive',style:'subheader'},
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:2},'',{text:'Multi Lane'},$scope.getYes('form[2].multilane'), {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[2].speed0'),
                     {text:'Day', style: 'small'} ,$scope.getYes('form[2].location0'),
                      {text:'Urban', style: 'small'} ,$scope.getYes('form[2].urban'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[2].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[2].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[2].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[2].speed1'),
                      {text:'Night', style: 'small'} ,$scope.getYes('form[2].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[2].rural'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[2].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[2].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[2].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Is justifiable and should be maintained', style: 'small'} ,$scope.getYes('form[3].t21'),$scope.getNo('form[3].t21'),{text:$scope.get('form[3].feedback'),rowSpan:8}],
                  [ {text:'2) justification for speed exemptions', style: 'small'} ,$scope.getYes('form[3].t22'),$scope.getNo('form[3].t22'),''],
                    [ {text:'3) effective tones (HSDT 1.4 – 3)', style: 'small'} ,$scope.getYes('form[3].t23'),$scope.getNo('form[3].t23'),''],
                    [ {text:'4)  Anticipate, others reaction (HSDT 1.4 – 4)', style: 'small'} ,$scope.getYes('form[3].t24'),$scope.getNo('form[3].t24'),''],
                    [ {text:'5) appropriate progress           \n(HSDT 1.4 – 5)', style: 'small'} ,$scope.getYes('form[3].t25'),$scope.getNo('form[3].t25'),''],
                    [ {text:'6) maintain communication       \n(HSDT 1.4 – 6)', style: 'small'} ,$scope.getYes('form[3].t26'),$scope.getNo('form[3].t26'),''],
                    [ {text:'7) duty of care with exemptions\n(HSDT 1.4 –7)', style: 'small'} ,$scope.getYes('form[3].t27'),$scope.getNo('form[3].t27'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',margin: [2,2,2,2]},$scope.getYes('form[3].t28'),$scope.getNo('form[3].t28'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[3].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[3].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
           
           {text:'Drivers licence and restrictions',style:'subheader',pageBreak: 'before'},
           {
              table: {
                widths: [ 'auto', '*', 'auto',100 ],
                body: [
                  [ {text:'Drivers Name',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].dname'), {text:'HRMS',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].hrms') ],
                ]
              }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Driving Licence No',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].dLicenceNo') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Address',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].Address') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'Cat C Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cExpiry0'),{text:'Cat C+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cExpiry1'),{text:'Cat C1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cExpiry2') ],
                    [ {text:'Cat C Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cCodes0'),{text:'Cat C+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cCodes1'),{text:'Cat C1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cCodes2') ],
                    [ {text:'Cat B Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bExpiry0'),{text:'Cat B+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bExpiry1'),{text:'Cat D/D1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bExpiry2') ],
                    [ {text:'Cat B Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bCodes0'),{text:'Cat B+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bCodes1'),{text:'Cat D/D1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bCodes2') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'20.5m Eye Check',fillColor: '#ffa07a',margin:[0,0,3,0]},$scope.getYes('form[4].eyeCheck'),{text:'Photo card expiry check',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.getYes('form[4].cardExpiry'),{text:'Date of Birth',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].DOB') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Endorsement and DVLA \ncheck',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].dvlaCheck') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'',pageBreak: 'before'},
           {
              table: {
                headerRows: 1,
                  pageBreak: 'before',
                widths: [ '*' ],
                body: [
                  [ {text:'Feedback / Development',style:'subheader',fillColor: '#ffa07a',margin: [5,5,5,5]} ],
                  [ {text:$scope.get('form[5].feedback'),style:'subheader',rowSpan:10, style: 'small'} ],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],[''],[''],['']
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[5].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[5].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
       ],
        images:{ tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABYDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEFAgQGB//EACcQAAEDBAEEAAcAAAAAAAAAAAECAwQABQYRIRITMUEHNUJRcYGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD3V65QY82PCemx25cnq7DC3Uhx3pG1dKd7VocnVcfdL7LyPI3sVsD7kduN82ujR5YB8MtHx3T7P0gH34x+I+EyMlt0ebZktR8ihPtuRZmwhQAVykq1vpHUVa+48ejdYXizeI44xbUr70gkuy5Ht95XKln+fgCkOLWBbY1shNQobKGo7Q0hA5/ZJ5JPkk8kkk0rdpTUxHulKVItTSlKo//Z'
               },
       styles: {
         header: {
           fontSize: 18,
           bold: true,
           alignment:'center' 
         },
           subheader: {
           fontSize: 14,
           bold: true,
           alignment:'center' 
         },
         anotherStyle: {
           italic: true,
           alignment: 'right'
         },
        small: {
            fontSize:10,
        },         
        paragraph:{
        fontSize:10,
       }   
       }
    };
}
else if(index==3)
{
    var docDefinition = {
       pageSize: 'A4',
       header: function(currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element
            if(currentPage==1)
           {
            return { text: 'COMPETENCY ASSESSMENT', style: 'header',margin: [0,8] };
           }
            return { text: '', style: 'header' };
      },
      footer: function(currentPage, pageCount) { return {text: currentPage.toString(),alignment:'center' }},
       content: [
           {text:'Demonstrate basic driving skills', style: 'header'},
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','auto' ,'*','*' ],
                body: [
                  [ 'NAME:',$scope.get('form[0].name'), 'NUMBER:',$scope.get('form[0].number'), 'INSTRUCTOR',$scope.get('form[0].instructor') ],
                  [ 'VEHICLE:',$scope.get('form[0].vehicle'), 'DATE:',{text:$scope.get('form[0].date'),colSpan:3},'','']
                ]
              }
            },
           '\n',
           {text:[{text:'Range statement: –',bold:true},
           {text:'A typical variety of road and traffic conditions within statutory speed limits', style: 'small'} ]},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Basic vehicle checks', style: 'small'} ,$scope.getYes('form[1].t11'),'',{text:$scope.get('form[1].feedback'),rowSpan:13}],
                  [ {text:'2) Familiarise with vehicle controls', style: 'small'} ,$scope.getYes('form[1].t12'),$scope.getNo('form[1].t12'),''],
                    [ {text:'3) Anticipation and planning', style: 'small'} ,$scope.getYes('form[1].t13'),$scope.getNo('form[1].t13'),''],
                    [ {text:'4) Steer the vehicle accurately', style: 'small'} ,$scope.getYes('form[1].t14'),$scope.getNo('form[1].t14'),''],
                    [ {text:'5) Control accelerator, brakes, gears clutch', style: 'small'} ,$scope.getYes('form[1].t15'),$scope.getNo('form[1].t15'),''],
                    [ {text:'6) Progress appropriate to the conditions', style: 'small'} ,$scope.getYes('form[1].t16'),$scope.getNo('form[1].t16'),''],
                    [ {text:'7) Approach and negotiate corners safely', style: 'small'} ,$scope.getYes('form[1].t17'),$scope.getNo('form[1].t17'),''],
                    [ {text:'8) Position the vehicle safely as appropriate', style: 'small'} ,$scope.getYes('form[1].t18'),$scope.getNo('form[1].t18'),''],
                    [ {text:'9) Signals use and response to others', style: 'small'} ,$scope.getYes('form[1].t19'),$scope.getNo('form[1].t19'),''],
                    [ {text:'10) Safe locations to park and manoeuvre', style: 'small'} ,$scope.getYes('form[1].t110'),$scope.getNo('form[1].t110'),''],
                    [ {text:'11) Call on the assistance of others', style: 'small'} ,$scope.getYes('form[1].t111'),$scope.getNo('form[1].t111'),''],
                    [ {text:'12) Reverse, manoeuvre and park the vehicle', style: 'small'} ,$scope.getYes('form[1].t112'),$scope.getNo('form[1].t112'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a'},$scope.getYes('form[1].t113'),$scope.getNo('form[1].t113'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           '\n',
           {text:'Undertake an emergency response drive',style:'subheader'},
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:2},'',{text:'Multi Lane'},$scope.getYes('form[2].multilane'), {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[2].speed0'),
                     {text:'Day', style: 'small'} ,$scope.getYes('form[2].location0'),
                      {text:'Urban', style: 'small'} ,$scope.getYes('form[2].urban'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[2].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[2].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[2].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[2].speed1'),
                      {text:'Night', style: 'small'} ,$scope.getYes('form[2].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[2].rural'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[2].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[2].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[2].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Is justifiable and should be maintained', style: 'small'} ,$scope.getYes('form[3].t21'),$scope.getNo('form[3].t21'),{text:$scope.get('form[3].feedback'),rowSpan:8}],
                  [ {text:'2) justification for speed exemptions', style: 'small'} ,$scope.getYes('form[3].t22'),$scope.getNo('form[3].t22'),''],
                    [ {text:'3) effective tones (HSDT 1.4 – 3)', style: 'small'} ,$scope.getYes('form[3].t23'),$scope.getNo('form[3].t23'),''],
                    [ {text:'4)  Anticipate, others reaction (HSDT 1.4 – 4)', style: 'small'} ,$scope.getYes('form[3].t24'),$scope.getNo('form[3].t24'),''],
                    [ {text:'5) appropriate progress           \n(HSDT 1.4 – 5)', style: 'small'} ,$scope.getYes('form[3].t25'),$scope.getNo('form[3].t25'),''],
                    [ {text:'6) maintain communication       \n(HSDT 1.4 – 6)', style: 'small'} ,$scope.getYes('form[3].t26'),$scope.getNo('form[3].t26'),''],
                    [ {text:'7) duty of care with exemptions\n(HSDT 1.4 –7)', style: 'small'} ,$scope.getYes('form[3].t27'),$scope.getNo('form[3].t27'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',margin: [2,2,2,2]},$scope.getYes('form[3].t28'),$scope.getNo('form[3].t28'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[3].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[3].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
           
           {text:'Drivers licence and restrictions',style:'subheader',pageBreak: 'before'},
           {
              table: {
                widths: [ 'auto', '*', 'auto',100 ],
                body: [
                  [ {text:'Drivers Name',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].dname'), {text:'HRMS',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].hrms') ],
                ]
              }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Driving Licence No',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].dLicenceNo') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Address',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].Address') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'Cat C Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cExpiry0'),{text:'Cat C+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cExpiry1'),{text:'Cat C1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cExpiry2') ],
                    [ {text:'Cat C Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cCodes0'),{text:'Cat C+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cCodes1'),{text:'Cat C1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cCodes2') ],
                    [ {text:'Cat B Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bExpiry0'),{text:'Cat B+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bExpiry1'),{text:'Cat D/D1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bExpiry2') ],
                    [ {text:'Cat B Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bCodes0'),{text:'Cat B+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bCodes1'),{text:'Cat D/D1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bCodes2') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'20.5m Eye Check',fillColor: '#ffa07a',margin:[0,0,3,0]},$scope.getYes('form[4].eyeCheck'),{text:'Photo card expiry check',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.getYes('form[4].cardExpiry'),{text:'Date of Birth',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].DOB') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Endorsement and DVLA \ncheck',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].dvlaCheck') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'',pageBreak: 'before'},
           {
              table: {
                headerRows: 1,
                  pageBreak: 'before',
                widths: [ '*' ],
                body: [
                  [ {text:'Feedback / Development',style:'subheader',fillColor: '#ffa07a',margin: [5,5,5,5]} ],
                  [ {text:$scope.get('form[5].feedback'),rowSpan:10, style: 'small'}  ],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],[''],[''],['']
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[5].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[5].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
       ],
        images:{ tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABYDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEFAgQGB//EACcQAAEDBAEEAAcAAAAAAAAAAAECAwQABQYRIRITMUEHNUJRcYGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD3V65QY82PCemx25cnq7DC3Uhx3pG1dKd7VocnVcfdL7LyPI3sVsD7kduN82ujR5YB8MtHx3T7P0gH34x+I+EyMlt0ebZktR8ihPtuRZmwhQAVykq1vpHUVa+48ejdYXizeI44xbUr70gkuy5Ht95XKln+fgCkOLWBbY1shNQobKGo7Q0hA5/ZJ5JPkk8kkk0rdpTUxHulKVItTSlKo//Z'
               },
       styles: {
         header: {
           fontSize: 18,
           bold: true,
           alignment:'center' 
         },
           subheader: {
           fontSize: 14,
           bold: true,
           alignment:'center' 
         },
         anotherStyle: {
           italic: true,
           alignment: 'right'
         },
        small: {
            fontSize:10,
        },   
        paragraph:{
        fontSize:10,
       }   
       }
    };
}
else if(index==4)
{
    var docDefinition = {
       pageSize: 'A4',
       header: function(currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element
            if(currentPage==1)
           {
            return { text: 'COMPETENCY ASSESSMENT', style: 'header',margin: [0,8] };
           }
            return { text: '', style: 'header' };
      },
      footer: function(currentPage, pageCount) { return {text: currentPage.toString(),alignment:'center' }},
       content: [
           {text:'Demonstrate basic driving skills', style: 'header'},
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','auto' ,'*','*' ],
                body: [
                  [ 'NAME:',$scope.get('form[0].name'), 'NUMBER:',$scope.get('form[0].number'), 'INSTRUCTOR',$scope.get('form[0].instructor') ],
                  [ 'VEHICLE:',$scope.get('form[0].vehicle'), 'DATE:',{text:$scope.get('form[0].date'),colSpan:3},'','']
                ]
              }
            },
           '\n',
           {text:[{text:'Range statement: –',bold:true},
           {text:'A typical variety of road and traffic conditions within statutory speed limits', style: 'small'} ]},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Basic vehicle checks', style: 'small'} ,$scope.getYes('form[1].t11'),'',{text:$scope.get('form[1].feedback'),rowSpan:13}],
                  [ {text:'2) Familiarise with vehicle controls', style: 'small'} ,$scope.getYes('form[1].t12'),$scope.getNo('form[1].t12'),''],
                    [ {text:'3) Anticipation and planning', style: 'small'} ,$scope.getYes('form[1].t13'),$scope.getNo('form[1].t13'),''],
                    [ {text:'4) Steer the vehicle accurately', style: 'small'} ,$scope.getYes('form[1].t14'),$scope.getNo('form[1].t14'),''],
                    [ {text:'5) Control accelerator, brakes, gears clutch', style: 'small'} ,$scope.getYes('form[1].t15'),$scope.getNo('form[1].t15'),''],
                    [ {text:'6) Progress appropriate to the conditions', style: 'small'} ,$scope.getYes('form[1].t16'),$scope.getNo('form[1].t16'),''],
                    [ {text:'7) Approach and negotiate corners safely', style: 'small'} ,$scope.getYes('form[1].t17'),$scope.getNo('form[1].t17'),''],
                    [ {text:'8) Position the vehicle safely as appropriate', style: 'small'} ,$scope.getYes('form[1].t18'),$scope.getNo('form[1].t18'),''],
                    [ {text:'9) Signals use and response to others', style: 'small'} ,$scope.getYes('form[1].t19'),$scope.getNo('form[1].t19'),''],
                    [ {text:'10) Safe locations to park and manoeuvre', style: 'small'} ,$scope.getYes('form[1].t110'),$scope.getNo('form[1].t110'),''],
                    [ {text:'11) Call on the assistance of others', style: 'small'} ,$scope.getYes('form[1].t111'),$scope.getNo('form[1].t111'),''],
                    [ {text:'12) Reverse, manoeuvre and park the vehicle', style: 'small'} ,$scope.getYes('form[1].t112'),$scope.getNo('form[1].t112'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a'},$scope.getYes('form[1].t113'),$scope.getNo('form[1].t113'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           '\n',
           {text:'Drive on Motorway and multi-lane carriageways carriageways\n',style:'subheader'},
           {
              table: {
                widths: [ 'auto', 100,'auto','*' ],
                body: [
                  [ {text:'VEHICLE:',margin:[5,0,5,0]},$scope.get('form[2].vehicle'),{text:'DATE:',margin:[15,0,15,0]},$scope.get('form[2].date') ],
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:4},'','','', {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[3].speed0'),
                     {text:'Multi Lane', style: 'small'} ,$scope.getYes('form[3].location0'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[3].location2'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[3].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[3].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[3].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[3].speed1'),
                      {text:'Motorway', style: 'small'} ,$scope.getYes('form[3].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[3].location3'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[3].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[3].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[3].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Joining motorway / multi carriageway road', style: 'small'} ,$scope.getYes('form[4].t21'),$scope.getNo('form[4].t21'),{text:$scope.get('form[4].feedback'),rowSpan:6, style: 'small'} ],
                  [ {text:'2) Adopt the correct lane or position', style: 'small'} ,$scope.getYes('form[4].t22'),$scope.getNo('form[4].t22'),''],
                    [ {text:'3)  Adjust speed appropriately', style: 'small'} ,$scope.getYes('form[4].t23'),$scope.getNo('form[4].t23'),''],
                    [ {text:'4) Correct procedure for exiting', style: 'small'} ,$scope.getYes('form[4].t24'),$scope.getNo('form[4].t24'),''],
                    [ {text:'5) Understand the relevant highway code', style: 'small'} ,$scope.getYes('form[4].t25'),$scope.getNo('form[4].t25'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',margin: [2,2,2,2]},{text:$scope.getYes('form[4].t26'),style:'subheader'},$scope.getNo('form[4].t26'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                  pageBreak: 'after',
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[4].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[4].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
           {text:'Drivers licence and restrictions',style:'subheader',pageBreak: 'before'},
           {
              table: {
                widths: [ 'auto', '*', 'auto',100 ],
                body: [
                  [ {text:'Drivers Name',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].dname'), {text:'HRMS',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].hrms') ],
                ]
              }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Driving Licence No',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].dLicenceNo') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Address',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].Address') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'Cat C Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cExpiry0'),{text:'Cat C+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cExpiry1'),{text:'Cat C1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cExpiry2') ],
                    [ {text:'Cat C Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cCodes0'),{text:'Cat C+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cCodes1'),{text:'Cat C1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cCodes2') ],
                    [ {text:'Cat B Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bExpiry0'),{text:'Cat B+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bExpiry1'),{text:'Cat D/D1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bExpiry2') ],
                    [ {text:'Cat B Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bCodes0'),{text:'Cat B+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bCodes1'),{text:'Cat D/D1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bCodes2') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'20.5m Eye Check',fillColor: '#ffa07a',margin:[0,0,3,0]},$scope.getYes('form[5].eyeCheck'),{text:'Photo card expiry check',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.getYes('form[5].cardExpiry'),{text:'Date of Birth',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].DOB') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Endorsement and DVLA \ncheck',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].dvlaCheck') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'',pageBreak: 'before'},
           {
              table: {
                headerRows: 1,
                  pageBreak: 'before',
                widths: [ '*' ],
                body: [
                  [ {text:'Feedback / Development',style:'subheader',fillColor: '#ffa07a',margin: [5,5,5,5]} ],
                  [ {text:$scope.get('form[6].feedback'),style:'small',rowSpan:10} ],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],[''],[''],['']
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[6].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[6].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
       ],
        images:{ tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABYDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEFAgQGB//EACcQAAEDBAEEAAcAAAAAAAAAAAECAwQABQYRIRITMUEHNUJRcYGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD3V65QY82PCemx25cnq7DC3Uhx3pG1dKd7VocnVcfdL7LyPI3sVsD7kduN82ujR5YB8MtHx3T7P0gH34x+I+EyMlt0ebZktR8ihPtuRZmwhQAVykq1vpHUVa+48ejdYXizeI44xbUr70gkuy5Ht95XKln+fgCkOLWBbY1shNQobKGo7Q0hA5/ZJ5JPkk8kkk0rdpTUxHulKVItTSlKo//Z'
               },
       styles: {
         header: {
           fontSize: 18,
           bold: true,
           alignment:'center' 
         },
           subheader: {
           fontSize: 14,
           bold: true,
           alignment:'center' 
         },
         anotherStyle: {
           italic: true,
           alignment: 'right'
         },
        small: {
            fontSize:10,
        },
        paragraph:{
        fontSize:10,
       }   
       }
    };
}
else if(index==5)
{//f5
    var docDefinition = {
       pageSize: 'A4',
       header: function(currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element
            if(currentPage==1)
           {
            return {text:'ERDT Feedback / Supplementary Evidence Sheet',alignment:'center',margin: [0,8]};
           }
            return { text: '', style: 'header' };
      },
      footer: function(currentPage, pageCount) { return {text: currentPage.toString(),alignment:'center' }},
       content: [
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ 'COURSE:', {text:'',colSpan:7 },'','','','','','' ],
                  [ 'NAME:',$scope.get('form[0].name'), 'NUMBER:',$scope.get('form[0].number'), 'INSTRUCTOR',{text:$scope.get('form[0].instructor'),colSpan:3},'','' ],
                  [ 'VEHICLE:',$scope.get('form[0].vehicle'), 'DATE:',$scope.get('form[0].date'), 'DAY:',$scope.get('form[0].day0'),'OF:',$scope.get('form[0].day1')]
                ]
              }
            },
           '\n',
            {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', '*', '*', '*','*' ,'*','*', '*', '*','*' ,'*','*'  ],
                body: [
                  [ {text:'ERDT ELEMENTS COVERED',colSpan:16,fillColor: '#ffa07a' }, '','','','','','','','','','','','','','','' ],
                  [ {text:'1.1',fillColor: '#ffa07a'},$scope.getYes('form[1].c11'),{text:'1.2a',fillColor: '#ffa07a'},$scope.getYes('form[1].c12a'),{text:'1.2b',fillColor: '#ffa07a'},$scope.getYes('form[1].c12b'),{text:'1.3',fillColor: '#ffa07a'},$scope.getYes('form[1].c13'),{text:'1.4',fillColor: '#ffa07a'},$scope.getYes('form[1].c14'),{text:'1.5',fillColor: '#ffa07a'},$scope.getYes('form[1].c15'),{text:'1.6',fillColor: '#ffa07a'},$scope.getYes('form[1].c16'),{text:'K&U\nA&B',fillColor: '#ffa07a'},{text:'/',alignment:'center'}  ],
                  [ {text:'INSTRUCTOR COMMENTS AND SESSION OUTLINE',colSpan:16,fillColor: '#ffa07a' }, '','','','','','','','','','','','','','','' ],
                    [ {text:'The course was introduced and aims and objectives. Were explained, licence checks completed and copies kept on file.\n'
+'Completion of red kite online assessment covering road craft, driver’s responsibilities, and highway code confirmed and results noted.\n\n'

+'Lecture session covering roadcraft elements: system of vehicle control, limit points, cornering, observation and skid control, and underpinned by a Q & As.\n'
+'Session used to reinforce & confirm students K & U of organisational policy and directives including red traffic light policy, relevant road traffic legislation.\n'
+'Speed, exemptions, motorway procedures, and drivers responsibilities\n'
+'Training vehicle was introduced and knowledge of vehicle checks confirmed through observation and Q &A. (1.1 & 1.2a)\n'
+'Following a short familiarisation drive in the vehicle 1.1 demonstrate basic driving skills this was assessed through direct observation.',colSpan:16,style:'paragraph' }, '','','','','','','','','','','','','','','' ],
                    [ {text:'AGREED DEVELOPMENT POINTS / TRAINING PLAN TO ACHIEVE COMPETENCE',colSpan:16,fillColor: '#ffa07a' }, '','','','','','','','','','','','','','','' ],
                    [ {text:$scope.get('form[1].agreedPoints'),colSpan:16  , style: 'small'}, '','','','','','','','','','','','','','','' ],
                    [ {text:'CANDIDATE COMMENTS',colSpan:16,fillColor: '#ffa07a' }, '','','','','','','','','','','','','','','' ],
                    [ {text:$scope.get('form[1].candidateComments'),colSpan:16  , style: 'small'} , '','','','','','','','','','','','','','','' ],
                    [{text:'INSTRUCTOR SIGN:',style:'subheader',margin: [0,0,5,0],colSpan:4}, '','','',{image:$scope.getImage('form[1].instructorSign'),colSpan:4,width: 70},'','','',{text:'CANDIDATE SIGN:',style:'subheader',margin: [0,0,5,0],colSpan:4 },'','','',{image:$scope.getImage('form[1].candidateSign'),colSpan:4,width: 70},'','','' ],
                ]
              }
            },
           {text:'Drivers licence and restrictions',style:'subheader',pageBreak: 'before'},
           '\n',
           {
              table: {
                widths: [ 'auto', '*', 'auto',100 ],
                body: [
                  [ {text:'Drivers Name',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].dname'), {text:'HRMS',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[2].hrms') ],
                ]
              }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Driving Licence No',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[2].dLicenceNo') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Address',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[2].Address') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'Cat C Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].cExpiry0'),{text:'Cat C+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].cExpiry1'),{text:'Cat C1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].cExpiry2') ],
                    [ {text:'Cat C Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].cCodes0'),{text:'Cat C+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].cCodes1'),{text:'Cat C1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].cCodes2') ],
                    [ {text:'Cat B Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].bExpiry0'),{text:'Cat B+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].bExpiry1'),{text:'Cat D/D1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].bExpiry2') ],
                    [ {text:'Cat B Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].bCodes0'),{text:'Cat B+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].bCodes1'),{text:'Cat D/D1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].bCodes2') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'20.5m Eye Check',fillColor: '#ffa07a',margin:[0,0,3,0]},$scope.getYes('form[2].eyeCheck'),{text:'Photo card expiry check',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.getYes('form[2].cardExpiry'),{text:'Date of Birth',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[2].DOB') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Endorsement and DVLA \ncheck',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[2].dvlaCheck') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'Record of assessment',alignment:'center',pageBreak: 'before'},
           {text:'ERDT ELEMENT 1.1 Demonstrate basic driving skills',alignment:'center'},
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ 'NAME:',$scope.get('form[3].name'), 'NUMBER:',$scope.get('form[3].number'), 'INSTRUCTOR',{text:$scope.get('form[3].instructor'),colSpan:3},'','' ],
                  [ 'VEHICLE:',$scope.get('form[3].vehicle'), 'DATE:',$scope.get('form[3].date'), 'DAY:',$scope.get('form[3].day0'),'OF:',$scope.get('form[3].day1')]
                ]
              }
            },
           '\n',
           {text:[{text:'Range statement: –',bold:true},
           {text:'A typical variety of road and traffic conditions within statutory speed limits', style: 'small'} ]},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto','*' , 'auto','auto' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'}, {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},''],
                  [ '','',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'}],
                  [ {text:'1) Complete basic vehicle checks, identifying, reporting and documenting obvious defects', style: 'small'} , $scope.get('form[4].t11f'),$scope.getYes('form[4].t11'),$scope.getNo('form[4].t11')],
                  [ {text:'2) Familiarise yourself with the vehicle controls before driving', style: 'small'} , $scope.get('form[4].t12f'),$scope.getYes('form[4].t12'),$scope.getNo('form[4].t12')],
                    [ {text:'3) Recognise, assess and manage hazards through effective observation, anticipation and planning', style: 'small'} , $scope.get('form[4].t13f'),$scope.getYes('form[4].t13'),$scope.getNo('form[4].t13')],
                    [ {text:'4) Steer the vehicle accurately to maintain a safe and appropriate course', style: 'small'} , $scope.get('form[4].t14f'),$scope.getYes('form[4].t14'),$scope.getNo('form[4].t14')],
                    [ {text:'5) Control the vehicle safely and accurately through the use of accelerator, brakes, gears and clutch as appropriate to the circumstances', style: 'small'} , $scope.get('form[4].t15f'),$scope.getYes('form[4].t15'),$scope.getNo('form[4].t15')],
                    [ {text:'6) Make progress appropriate to the conditions and circumstances', style: 'small'} , $scope.get('form[4].t16f'),$scope.getYes('form[4].t16'),$scope.getNo('form[4].t16')],
                    [ {text:'7) Approach and negotiate corners safely', style: 'small'} , $scope.get('form[4].t17f'),$scope.getYes('form[4].t17'),$scope.getNo('form[4].t17')],
                    [ {text:'8) Position the vehicle safely as appropriate to the circumstances', style: 'small'} , $scope.get('form[4].t18f'),$scope.getYes('form[4].t18'),$scope.getNo('form[4].t18')],
                    [ {text:'9) Use appropriate signals and respond correctly to the signals of other road users', style: 'small'} , $scope.get('form[4].t19f'),$scope.getYes('form[4].t19'),$scope.getNo('form[4].t19')],
                    [ {text:'10) Select safe and appropriate locations to park and manoeuvre', style: 'small'} , $scope.get('form[4].t110f'),$scope.getYes('form[4].t110'),$scope.getNo('form[4].t110')],
                    [ {text:'11) Call on the assistance of others before completing difficult manoeuvres', style: 'small'} , $scope.get('form[4].t111f'),$scope.getYes('form[4].t111'),$scope.getNo('form[4].t111')],
                    [ {text:'12) Reverse, manoeuvre and park the vehicle safely', style: 'small'} , $scope.get('form[4].t112f'),$scope.getYes('form[4].t112'),$scope.getNo('form[4].t112')],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',colSpan:2},'',$scope.getYesText('form[4].t113'),$scope.getNoText('form[4].t113')],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[4].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[4].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'Record of assessment',alignment:'center',pageBreak: 'before'},
           {text:'ERDT ELEMENT 1.2a Prepare the vehicle to drive at high speed',alignment:'center'},
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ 'NAME:',$scope.get('form[5].name'), 'NUMBER:',$scope.get('form[5].number'), 'INSTRUCTOR',{text:$scope.get('form[5].instructor'),colSpan:3},'','' ],
                  [ 'VEHICLE:',$scope.get('form[5].vehicle'), 'DATE:',$scope.get('form[5].date'), 'DAY:',$scope.get('form[5].day0'),'OF:',$scope.get('form[5].day1')]
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto','*' , 'auto','auto' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'}, {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'' ],
                  [ '','',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'}],
                  [ {text:'Preparing the vehicle\n8)  Ensure you are authorised to prepare and drive the vehicle', style: 'small'} , $scope.get('form[6].t21f'),$scope.getYes('form[6].t21'),$scope.getNo('form[6].t21')],
                  [ {text:'9) Familiarise yourself with the vehicle and its controls', style: 'small'} , $scope.get('form[6].t22f'),$scope.getYes('form[6].t22'),$scope.getNo('form[6].t22')],
                    [ {text:'10)  carry out required checks to;\nTyres √, Brakes √, Fluid levels √, Lights Sound equipment √, Safety equipment √, Bodywork √, Cleanliness √, Operational equipment √ ', style: 'small'} , $scope.get('form[6].t23f'),$scope.getYes('form[6].t23'),$scope.getNo('form[6].t23')],
                    [ {text:'11) ensure the vehicle is fit for purpose during and after use', style: 'small'} , $scope.get('form[6].t24f'),$scope.getYes('form[6].t24'),$scope.getNo('form[6].t24')],
                    [ {text:'12) identify, report and record any defects or damage prior and following use, and take the correct action in regard to these', style: 'small'} , $scope.get('form[6].t25f'),$scope.getYes('form[6].t25'),$scope.getNo('form[6].t25')],
                    [ {text:'13) ensure that any equipment required to be with the vehicle is present and in working order', style: 'small'} , $scope.get('form[6].t26f'),$scope.getYes('form[6].t26'),$scope.getNo('form[6].t26')],
                    [ {text:'14) Keep accurate and complete documentation as required relating to your use of the vehicle.', style: 'small'} , $scope.get('form[6].t27f'),$scope.getYes('form[6].t27'),$scope.getNo('form[6].t27')],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',colSpan:2},'',$scope.getYesText('form[6].t28'),$scope.getNoText('form[6].t28')],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[6].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[6].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'Record of assessment',alignment:'center',pageBreak: 'before'},
           {text:'ERDT ELEMENT 1.2b Driving the vehicle at high speed',alignment:'center'},
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ 'NAME:',$scope.get('form[7].name'), 'NUMBER:',$scope.get('form[7].number'), 'INSTRUCTOR',{text:$scope.get('form[7].instructor'),colSpan:3},'','' ],
                  [ 'VEHICLE:',$scope.get('form[7].vehicle'), 'DATE:',$scope.get('form[7].date'), 'DAY:',$scope.get('form[7].day0'),'OF:',$scope.get('form[7].day1')]
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:4},'','','', {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[8].speed0'),
                     {text:'Major Roads', style: 'small'} ,$scope.getYes('form[8].location0'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[8].location2'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[8].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[8].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[8].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[8].speed1'),
                      {text:'Minor Roads', style: 'small'} ,$scope.getYes('form[8].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[8].location3'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[8].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[8].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[8].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto','*' , 'auto','auto' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'}, {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'' ],
                  [ '','',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'}],
                  [ {text:'B) Formulating and implementing driving plans\n1) Gather information at an early stage early stage through accurate observations and the use of other senses', style: 'small'} , $scope.get('form[9].t31f'),$scope.getYes('form[9].t31'), $scope.getNo('form[9].t31')],
                  [ {text:'2) use this information to correctly anticipate all driving situations', style: 'small'} , $scope.get('form[9].t32f'),$scope.getYes('form[9].t32'),$scope.getNo('form[9].t32')],
                    [ {text:'3)  use observation links effectively', style: 'small'} , $scope.get('form[9].t33f'),$scope.getYes('form[9].t33'),$scope.getNo('form[9].t33')],
                    [ {text:'4) use information and anticipation to formulate flexible driving plans', style: 'small'} , $scope.get('form[9].t34f'),$scope.getYes('form[9].t34'),$scope.getNo('form[9].t34')],
                    [ {text:'5) implement driving plans to safely negotiate all driving situations', style: 'small'} , $scope.get('form[9].t35f'),$scope.getYes('form[9].t35'),$scope.getNo('form[9].t35')],
                    [ {text:'C) Making progress whilst showing restraint\n1) accurately judge the speed of your own and other vehicles relative to your proposed actions and the circumstances', style: 'small'} , $scope.get('form[9].t36f'),$scope.getYes('form[9].t36'),$scope.getNo('form[9].t36')],
                    [ {text:'2) make progress whilst maintaining the need for restraint and safety', style: 'small'} , $scope.get('form[9].t37f'),$scope.getYes('form[9].t37'),$scope.getNo('form[9].t37')],
                    [ {text:'D) Controlling the vehicle\n1) control the vehicle safely and smoothly through use of the accelerator', style: 'small'} , $scope.get('form[9].t38f'),$scope.getYes('form[9].t38'),$scope.getNo('form[9].t38')],
                    [ {text:'2) control the vehicle safely and smoothly by applying the required amount of braking at the correct time', style: 'small'} , $scope.get('form[9].t39f'),$scope.getYes('form[9].t39'),$scope.getNo('form[9].t39')],
                    [ {text:'3) when driving manual vehicle select the correct gear for the circumstances by smooth use of the gears and clutch', style: 'small'} , $scope.get('form[9].t310f'),$scope.getYes('form[9].t310'),$scope.getNo('form[9].t310')],
                    [ {text:'4) steer the vehicle accurately, adapting steering techniques as necessary when manoeuvring', style: 'small'} , $scope.get('form[9].t311f'),$scope.getYes('form[9].t311'),$scope.getNo('form[9].t311')],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',colSpan:2},'',$scope.getYesText('form[9].t312'),$scope.getNoText('form[9].t312')],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[9].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[9].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'Record of assessment',alignment:'center',pageBreak: 'before'},
           {text:'ERDT ELEMENT 1.2b Driving the vehicle at high speed (continued)',alignment:'center'},
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*' ,'*', '*', '*'  ],
                body: [
                  [ 'NAME:',$scope.get('form[10].name'), 'NUMBER:',$scope.get('form[10].number'), 'DATE:',{text:$scope.get('form[10].date')} ],
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto','*' , 'auto','auto' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'}, {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'' ],
                  [ '','',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'}],
                  [ {text:'E) Positioning\n1) position the vehicle correctly when following and overtaking other vehicles', style: 'small'} , $scope.get('form[11].t41f'),$scope.getYes('form[11].t41'),$scope.getNo('form[11].t41')],
                  [ {text:'2) position the vehicle correctly when negotiating corners and bend', style: 'small'} , $scope.get('form[11].t42f'),$scope.getYes('form[11].t42'),$scope.getNo('form[11].t42')],
                    [ {text:'3) position the vehicle to obtain the best view with regard to safety', style: 'small'} , $scope.get('form[11].t43f'),$scope.getYes('form[11].t43'),$scope.getNo('form[11].t43')],
                    [ {text:'4) adopt the safest road position at all times in relation to existing road and traffic positions', style: 'small'} , $scope.get('form[11].t44f'),$scope.getYes('form[11].t44'),$scope.getNo('form[11].t44')],
                    [ {text:'F) Cornering\n1) assess corners and bends correctly and accurately', style: 'small'} , $scope.get('form[11].t45f'),$scope.getYes('form[11].t45'),$scope.getNo('form[11].t45')],
                    [ {text:'2) negotiate corners and bends taking account of all relevant factors', style: 'small'} , $scope.get('form[11].t46f'),$scope.getYes('form[11].t46'),$scope.getNo('form[11].t46')],
                    [ {text:'G) Making and interpreting signals\n1) Make appropriate signals to other road users using: indicators, lights, audible, hand signals.', style: 'small'} , $scope.get('form[11].t47f'),$scope.getYes('form[11].t47'),$scope.getNo('form[11].t47')],
                    [ {text:'2) correctly interpret and act on signals from other road users', style: 'small'} , $scope.get('form[11].t48f'),$scope.getYes('form[11].t48'),$scope.getNo('form[11].t48')],
                    [ {text:'H) Overtaking\n1) identify, plan and execute all overtaking manoeuvres safely when passing stationary and moving objects', style: 'small'} , $scope.get('form[11].t49f'),$scope.getYes('form[11].t49'),$scope.getNo('form[11].t49')],
                    [ {text:'2) apply the correct degree of restraint at all times', style: 'small'} , $scope.get('form[11].t410f'),$scope.getYes('form[11].t410'),$scope.getNo('form[11].t410')],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',colSpan:2},'',$scope.getYesText('form[11].t411'),$scope.getNoText('form[11].t411')],
                ]
              }
            },
               {
                  table: {
                    headerRows: 1,
                    widths: [ 'auto', '*', 'auto','*' ],
                    body: [
                      [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[11].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[11].candidateSign'),width: 70} ]
                    ]
                  },
                   layout: {
                       hLineWidth: function(i, node) {
                            return (i === 0 ) ? 0 : 1;
                        }
                   }
                },
           {text:'ERDT ELEMENT 1.3 Drive vehicles at high speed on motorway and multi-lane carriageways',alignment:'center',pageBreak: 'before'},
           '\n',
           {
              table: {
                headerRows: 1,
                pageBreak: 'before',
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ 'NAME:',$scope.get('form[12].name'), 'NUMBER:',$scope.get('form[12].number'), 'INSTRUCTOR',{text:$scope.get('form[12].instructor'),colSpan:3},'','' ],
                  [ 'VEHICLE:',$scope.get('form[12].vehicle'), 'DATE:',$scope.get('form[12].date'), 'DAY:',$scope.get('form[12].day0'),'OF:',$scope.get('form[12].day1')]
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:2},'',{text:'Multi Lane'},$scope.getYes('form[13].multilane'), {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[13].speed0'),
                     {text:'Day', style: 'small'} ,$scope.getYes('form[13].location0'),
                      {text:'Urban', style: 'small'} ,$scope.getYes('form[13].urban'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[13].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[13].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[13].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[13].speed1'),
                      {text:'Night', style: 'small'} ,$scope.getYes('form[13].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[13].rural'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[13].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[13].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[13].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto','*' , 'auto','auto' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'}, {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'' ],
                  [ '','',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'}],
                  [ {text:'1) Follow the correct procedure for joining motorway / multi carriageway road', style: 'small'} , $scope.get('form[14].t51f'),$scope.getYes('form[14].t51'),$scope.getNo('form[14].t51')],
                  [ {text:'2) Adopt the correct lane or position for existing road and traffic conditions', style: 'small'} , $scope.get('form[14].t52f'),$scope.getYes('form[14].t52'),$scope.getNo('form[14].t52')],
                    [ {text:'3)  adjust speed appropriately for type of road and traffic conditions', style: 'small'} , $scope.get('form[14].t53f'),$scope.getYes('form[14].t53'),$scope.getNo('form[14].t53')],
                    [ {text:'4) follow the correct procedure for exiting the motorway / multi carriageway road', style: 'small'} , $scope.get('form[14].t54f'),$scope.getYes('form[14].t54'),$scope.getNo('form[14].t54')],
                    [ {text:'5) understand the relevant sections of the highway code, including the meaning of all road signs, matrix signals, marker boards and cats eyes', style: 'small'} , $scope.get('form[14].t55f'),$scope.getYes('form[14].t55'),$scope.getNo('form[14].t55')],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',colSpan:2},'',$scope.getYesText('form[14].t56'),$scope.getNoText('form[14].t56')],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[14].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[14].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'ERDT ELEMENT 1.4 Undertake an emergency response drive',alignment:'center',pageBreak: 'before'},
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ 'NAME:',$scope.get('form[15].name'), 'NUMBER:',$scope.get('form[15].number'), 'INSTRUCTOR',{text:$scope.get('form[15].instructor'),colSpan:3},'','' ],
                  [ 'VEHICLE:',$scope.get('form[15].vehicle'), 'DATE:',$scope.get('form[15].date'), 'DAY:',$scope.get('form[15].day0'),'OF:',$scope.get('form[15].day1')]
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:2},'',{text:'Multi Lane'},$scope.getYes('form[16].multilane'), {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[16].speed0'),
                     {text:'Day', style: 'small'} ,$scope.getYes('form[16].location0'),
                      {text:'Urban', style: 'small'} ,$scope.getYes('form[16].urban'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[16].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[16].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[16].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[16].speed1'),
                      {text:'Night', style: 'small'} ,$scope.getYes('form[16].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[16].rural'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[16].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[16].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[16].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto','*' , 'auto','auto' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'}, {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'' ],
                  [ '','',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'}],
                  [ {text:'1) Ensure that an emergency response is justifiable and should be maintained', style: 'small'} , $scope.get('form[17].t61f'),$scope.getYes('form[17].t61'),$scope.getNo('form[17].t61')
],
                  [ {text:'2) Ensure that there is justification for taking advantage of your speed exemptions', style: 'small'} , $scope.get('form[17].t62f'),$scope.getYes('form[17].t62'),$scope.getNo('form[17].t62')],
                    [ {text:'3)  make effective use of emergency warning equipment, when appropriate', style: 'small'} , $scope.get('form[17].t63f'),$scope.getYes('form[17].t63'),$scope.getNo('form[17].t63')],
                    [ {text:'4)  Anticipate and respond to the action of other road users when emergency warning equipment is used', style: 'small'} , $scope.get('form[17].t64f'),$scope.getYes('form[17].t64'),$scope.getNo('form[17].t64')],
                    [ {text:'5) make safe and appropriate progress', style: 'small'} , $scope.get('form[17].t65f'),$scope.getYes('form[17].t65'),$scope.getNo('form[17].t65')],
                    [ {text:'6) maintain clear communication with others as required', style: 'small'} , $scope.get('form[17].t66f'),$scope.getYes('form[17].t66'),$scope.getNo('form[17].t66')],
                    [ {text:'7) maintain duty of care whilst using legal exemptions', style: 'small'} , $scope.get('form[17].t67f'),$scope.getYes('form[17].t67'),$scope.getNo('form[17].t67')],
                    [ {text:'8) ensure all actions are consistent with legal requirements and organisational policies', style: 'small'} , $scope.get('form[17].t68f'),$scope.getYes('form[17].t68'),$scope.getNo('form[17].t68')],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',colSpan:2},'',$scope.getYesText('form[17].t69'),$scope.getNoText('form[17].t69')],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[17].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[17].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'Response Driving Assessment Report', alignment:'center',pageBreak: 'before'},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', '*', 'auto','*' ,'auto', '*'  ],
                body: [
                  [ 'NAME.',$scope.get('form[18].name'), 'Role.',$scope.get('form[18].role'), 'HRMS No.',{text:$scope.get('form[18].role')} ],
                  [ 'Vehicle Type.',$scope.get('form[18].vehicle'), 'Reg No.',$scope.get('form[18].regno'), 'Date.',$scope.get('form[18].date')]
                ]
              }
            },
           {text:'\n'},
           {
              table: {
                headerRows: 1,
                widths: [ '*', 'auto','*', 'auto'  ],
                body: [
                  [ {text:'1. VEHICLE SAFETY CHECKS',fillColor: '#ffa07a'},$scope.getYes('form[19].vehicleSafetyCheck'), {text:'2. COCKPIT SAFETY CHECKS',fillColor: '#ffa07a'},$scope.getYes('form[19].cockpitSafetyCheck')]
                ]
              }
            },
           {text:'\n'},
           {
              table: {
                headerRows: 1,
                widths: [ '*', 'auto','auto','auto','*', 'auto','auto','auto'  ],
                body: [
                  [ {text:'3. CONTROL',fillColor: '#ffa07a'},'T','S','D', {text:'8. USE OF SPEED',fillColor: '#ffa07a'},'T','S','D'],
                    [ 'ACCELERATOR',$scope.getTotal('form[19].c3accelerator'), $scope.get('form[19].c3acceleratorS'),$scope.get('form[19].c3acceleratorD'), 'PROGRESS',$scope.getTotal('form[19].c8progress'),$scope.get('form[19].c8progressS'),$scope.get('form[19].c8progressD')],
                    [ 'GEARS',$scope.getTotal('form[19].c3gears'),$scope.get('form[19].c3gearsS'),$scope.get('form[19].c3gearsD'), 'UNDUE HESITATION',$scope.getTotal('form[19].c8undueHesitation'),$scope.get('form[19].c8undueHesitationS'),$scope.get('form[19].c8undueHesitationD')],
                    [ 'FOOTBRAKE',$scope.getTotal('form[19].c3footbrake'),$scope.get('form[19].c3footbrakeS'),$scope.get('form[19].c3footbrakeD'), 'SPEED +', $scope.getTotal('form[19].c8speed'),$scope.get('form[19].c8speedS'),$scope.get('form[19].c8speedD')],
                    [ 'HANDBRAKE',$scope.getTotal('form[19].c3handbrake'),$scope.get('form[19].c3handbrakeS'),$scope.get('form[19].c3handbrakeD'), {text:'',colSpan:4},'','',''],
                    [ 'CLUTCH',$scope.getTotal('form[19].c3clutch'),$scope.get('form[19].c3clutchS'),$scope.get('form[19].c3clutchD'), {text:'9. SIGNALS',fillColor: '#ffa07a'},{text:'',colSpan:3},'',''],
                    [ 'STEERING',$scope.getTotal('form[19].c3steering'),$scope.get('form[19].c3steeringS'),$scope.get('form[19].c3steeringD'), 'NECESSARY',$scope.getTotal('form[19].c9Necessary'),$scope.get('form[19].c9NecessaryS'),$scope.get('form[19].c9NecessaryD')],
                    [ {text:'',colSpan:4},'','','', 'CORRECT',$scope.getTotal('form[19].c9correct'),$scope.get('form[19].c9correctS'),$scope.get('form[19].c9correctD')],
                    [ {text:'4. RESPONSE TO SIGNS AND SIGNALS',fillColor: '#ffa07a'},{text:'',colSpan:3},'','', 'TIMED',$scope.getTotal('form[19].c9timed'),$scope.get('form[19].c9timedS'),$scope.get('form[19].c9timedD')],
                    [ 'TRAFFIC SIGNS',$scope.getTotal('form[19].c4trafficSign'),$scope.get('form[19].c4trafficSignS'),$scope.get('form[19].c4trafficSignD'), 'AUDIBLE WARNINGS',$scope.getTotal('form[19].c9audibleWarning'),$scope.get('form[19].c9audibleWarningS'),$scope.get('form[19].c9audibleWarningD')],
                    [ 'ROAD MARKINGS',$scope.getTotal('form[19].c4roadMarking'),$scope.get('form[19].c4roadMarkingS'), $scope.get('form[19].c4roadMarkingD'), {text:'',colSpan:4},'','',''],
                    [ 'RED TRAFFIC LIGHTS',$scope.getTotal('form[19].c4redTrafficLight'),$scope.get('form[19].c4redTrafficLightS'), $scope.get('form[19].c4redTrafficLightD'), {text:'10. POSITIONING',fillColor: '#ffa07a'},{text:'',colSpan:3},'',''],
                    [ 'OTHER ROAD USERS',$scope.getTotal('form[19].c4otherRoadUser'),$scope.get('form[19].c4otherRoadUserS'), $scope.get('form[19].c4otherRoadUserD'), 'RESPONSE DRIVING',$scope.getTotal('form[19].c10responseDriving'),$scope.get('form[19].c10responseDrivingS'), $scope.get('form[19].c10responseDrivingD')],
                    [ 'PEDESTRIAN CROSSINGS',$scope.getTotal('form[19].c4pedestrianCrossing'),$scope.get('form[19].c4pedestrianCrossingS'), $scope.get('form[19].c4pedestrianCrossingD'), 'CLEARANCE OF OBSTACLES',$scope.getTotal('form[19].c10clearanceOfObstacle'),$scope.get('form[19].c10clearanceOfObstacleS'), $scope.get('form[19].c10clearanceOfObstacleD')],
                    [ {text:'5. JUDGEMENT WHEN',fillColor: '#ffa07a'},{text:'',colSpan:3},'','', {text:'',colSpan:4},'','',''],
                    [ 'OVERTAKING',$scope.getTotal('form[19].c5overtaking'),$scope.get('form[19].c5overtakingS'), $scope.get('form[19].c5overtakingD'), {text:'11. AWARENESS AND PLANNING',fillColor: '#ffa07a'},{text:'',colSpan:3},'',''],
                    [ 'MEETING',$scope.getTotal('form[19].c5meeting'),$scope.get('form[19].c5meetingS'), $scope.get('form[19].c5meetingD'), '',$scope.getTotal('form[19].c11awarenessAndPlanning'),$scope.get('form[19].c11awarenessAndPlanningS'), $scope.get('form[19].c11awarenessAndPlanningD')],
                    [ 'CROSSING',$scope.getTotal('form[19].c5crossing'),$scope.get('form[19].c5crossingS'), $scope.get('form[19].c5crossingD'), {text:'',colSpan:4},'','',''],
                    [ {text:'',colSpan:4},'','','', {text:'12. ATTITUDE',fillColor: '#ffa07a'},{text:'',colSpan:3},'',''],
                    [ {text:'6. JUNCTIONS AND ROUNDABOUTS',fillColor: '#ffa07a'},{text:'',colSpan:3},'','', 'DRIVER BEHAVIOUR',$scope.getTotal('form[19].c12driverBehaviour'),$scope.get('form[19].c12driverBehaviourS'), $scope.get('form[19].c12driverBehaviourD')],
                    [ 'APPROACH SPEED',$scope.getTotal('form[19].c6approachSpeed'),$scope.get('form[19].c6approachSpeedS'), $scope.get('form[19].c6approachSpeedD'), 'COURTESY TO PUBLIC',$scope.getTotal('form[19].c12courtesyOfPublic'),$scope.get('form[19].c12courtesyOfPublicS'), $scope.get('form[19].c12courtesyOfPublicD')],
                    [ 'OBSERVATION',$scope.getTotal('form[19].c6observation'),$scope.get('form[19].c6observationS'), $scope.get('form[19].c6observationD'), {text:'',colSpan:4},'','',''],
                    [ 'POSITION',$scope.getTotal('form[19].c6position'),$scope.get('form[19].c6positionS'), $scope.get('form[19].c6positionD'), {text:'13. SYSTEM OF VEHICLE CONTROL',fillColor: '#ffa07a'},{text:'',colSpan:3},'',''],
                    [ {text:'',colSpan:4},'','','', '',$scope.getTotal('form[19].c13systemOfVehicle'),$scope.get('form[19].c13systemOfVehicleS'), $scope.get('form[19].c13systemOfVehicleD')],
                    [ {text:'7. USE OF MIRRORS',fillColor: '#ffa07a'},{text:'',colSpan:3},'','', {text:'ASSESSOR TOOK ACTION',colSpan:2},'',$scope.getYes('form[19].assesorTookActionV'), $scope.getYes('form[19].assesorTookActionP')],
                    [ 'SIGNALLING',$scope.getTotal('form[19].c6signaling'),$scope.get('form[19].c6signalingS'), $scope.get('form[19].c6signalingS'), ' TOTAL DRIVING FAULTS','','',''],
                    [ 'CHANGE OF DIRECTION',$scope.getTotal('form[19].c7changeOfDirection'),$scope.get('form[19].c7changeOfDirectionS'), $scope.get('form[19].c7changeOfDirectionD'), {text:'COMPETENT',colSpan:3},'','', $scope.getYesText('form[19].competent')],
                    [ 'CHANGE OF     SPEED',$scope.getTotal('form[19].c7changeOfSpeed'), $scope.get('form[19].c7changeOfSpeedS'), $scope.get('form[19].c7changeOfSpeedD'), {text:' NOT YET COMPETENT',colSpan:3},'','', $scope.getNoText('form[19].competent')],
                    
                ]
              }
            },
           {text:'\n'},
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*','auto', '*','auto', '*'  ],
                body: [
                  [ 'CANDIDATE SIGNATURE',{image:$scope.getImage('form[17].candidateSign'),width: 70}, 'ASSESSOR PRINT NAME',$scope.get('form[19].assesorPrintName'),'ASSESSOR SIGNATURE',{image:$scope.getImage('form[17].assesorSign'),width: 70}]
                ]
              }
            },
           {text:'',pageBreak: 'before'},
           {
              table: {
                headerRows: 1,
                widths: [ '*' ],
                body: [
                  [ {text:'Feedback / Development',style:'subheader',fillColor: '#ffa07a',margin: [5,5,5,5]} ],
                  [ {text:$scope.get('form[20].feedback'),style:'small',rowSpan:10} ],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],[''],[''],['']
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*', 'auto','*' ],
                body: [
                  [ {text:'ASSESSOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[20].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[20].candidateSign'),width: 70},
                   {text:'DATE',style:'subheader',margin: [2,2,2,2]},
                   {text: $scope.get('form[20].date'),margin: [2,2,2,2]}
                  ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
       ],
        images:{ tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABYDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEFAgQGB//EACcQAAEDBAEEAAcAAAAAAAAAAAECAwQABQYRIRITMUEHNUJRcYGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD3V65QY82PCemx25cnq7DC3Uhx3pG1dKd7VocnVcfdL7LyPI3sVsD7kduN82ujR5YB8MtHx3T7P0gH34x+I+EyMlt0ebZktR8ihPtuRZmwhQAVykq1vpHUVa+48ejdYXizeI44xbUr70gkuy5Ht95XKln+fgCkOLWBbY1shNQobKGo7Q0hA5/ZJ5JPkk8kkk0rdpTUxHulKVItTSlKo//Z'
               },
       styles: {
         header: {
           fontSize: 18,
           bold: true,
           alignment:'center' 
         },
           subheader: {
           fontSize: 14,
           bold: true,
           alignment:'center' 
         },
         anotherStyle: {
           italic: true,
           alignment: 'right'
         },
        small: {
            fontSize:10,
        },
         paragraph:{
            fontSize:10,
         }  
       }
    };
}
                    //ends
        pdfMake.createPdf(docDefinition).getBuffer(function(buffer) {
         var binary=buffer;
            console.log($scope.getName(index));
          document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() {
                usSpinnerService.stop('spinner-1');
                cordova.plugins.email.open({
//                        to:      ["mali8918@gmail.com"],
                        subject: "Feedback for your App",
                        body:    'Driver Training',
                         attachments: ['base64:'+$scope.getName(index)+'//'+ binary.toString('base64')]
                });
            }
        }); 
                }
              });
        
    }
    $scope.downloadForm = function(_id,index) {
        console.log(_id);
        $scope.index = index;
        $http.get('http://79.123.48.77:5000/getForm',{
                params: { _id: _id }
            }).
              success(function(data, status, headers, config) {
                if(data.success)
                {
                    TodosService.form[index]=data.form.data;
                    $scope.form=data.form.data;
                    console.log(data.form);
if(index==0)
{
    console.log("in one");
    var docDefinition = {
       pageSize: 'A4',
       header: function(currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element
           if(currentPage==1)
           {
            return { text: 'ERDT Feedback / Supplementary Evidence Sheet', style: 'header', margin: [0,8] };
           }
           else if(currentPage==2)
           {
            return { text: 'COMPETENCY ASSESSMENT', style: 'header', margin: [0,8] };
           }
            return { text: '', style: 'header' , margin: [0,8] };
      },
      footer: function(currentPage, pageCount) { return {text: currentPage.toString(),alignment:'center' }},
       content: [
            {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ { text: 'COURSE:', style: 'small'},
                   {text:'ERDT  REFRESHER',colSpan:7, style: 'small' },'','','','','','' ],
                  [ { text: 'NAME:', style: 'small'},
                   $scope.get('form[0].name'),
                   { text: 'NUMBER:', style: 'small'},$scope.get('form[0].number'),
                   { text:'INSTRUCTOR', style: 'small'},{text:$scope.get('form[0].instructor'),colSpan:3}
                   ,'','' ],
                  [ { text: 'VEHICLE:', style: 'small'},$scope.get('form[0].vehicle'),
                     { text: 'DATE:', style: 'small'},$scope.get('form[0].date'),
                     { text:'DAY:', style: 'small'},$scope.get('form[0].day0'),
                     { text:'OF:', style: 'small'},$scope.get('form[0].day1')]
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', '*', '*', '*','*' ,'*','*', '*', '*','*' ,'*','*'  ],
                body: [
                  [ {text:'ERDT ELEMENTS COVERED',colSpan:16,fillColor: '#ffa07a', style: 'small' }, '','','','','','','','','','','','','','','' ],
                  [ {text:'1.1',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c11'),
                   {text:'1.2a',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c12a'),
                   {text:'1.2b',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c12b'),
                   {text:'1.3',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c13'),
                   {text:'1.4',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c14'),
                   {text:'1.5',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c15'),
                   {text:'1.6',fillColor: '#ffa07a', style: 'small'},
                   $scope.getYes('form[1].c16'),
                   {text:'K&U\nA&B',fillColor: '#ffa07a', style: 'small'},
                   {image:'tick',width:12,alignment:'center'}  ],
                  [ {text:'INSTRUCTOR COMMENTS AND SESSION OUTLINE',colSpan:16,fillColor: '#ffa07a', style: 'small' }, '','','','','','','','','','','','','','','' ],
                    [ {text:'The course was introduced and aims and objectives. Were explained, licence checks completed and copies kept on file.\n'
+'Completion of red kite online assessment covering road craft, driver’s responsibilities, and highway code confirmed and results noted.\n\n'

+'Lecture session covering roadcraft elements: system of vehicle control, limit points, cornering, observation and skid control, and underpinned by a Q & As.\n'
+'Session used to reinforce & confirm students K & U of organisational policy and directives including red traffic light policy, relevant road traffic legislation.\n'
+'Speed, exemptions, motorway procedures, and drivers responsibilities\n'
+'Training vehicle was introduced and knowledge of vehicle checks confirmed through observation and Q &A. (1.1 & 1.2a)\n'
+'Following a short familiarisation drive in the vehicle 1.1 was assessed through direct observation.\n'
+'Elements 1.2a, 1.3, 1.4 were carried out during the rest of the day taking in all types of routes.\n'
+'K & U in element 1. 5 was done by lecture and underpinned by Q & As. And monitored through direct observation during the practical drives.\n'
+'Attitudes and behaviour monitored throughout the day by direct observation',colSpan:16,style:'paragraph' }, '','','','','','','','','','','','','','','' ],
                    [ {text:'AGREED DEVELOPMENT POINTS / TRAINING PLAN TO ACHIEVE COMPETENCE',colSpan:16,fillColor: '#ffa07a' }, '','','','','','','','','','','','','','','' ],
                    [ {text:$scope.get('form[1].agreedPoints'),colSpan:16, style: 'small' }, '','','','','','','','','','','','','','','' ],
                    [ {text:'CANDIDATE COMMENTS',colSpan:16,fillColor: '#ffa07a', style: 'small' }, '','','','','','','','','','','','','','','' ],
                    [ {text:$scope.get('form[1].candidateComments'),colSpan:16  }, '','','','','','','','','','','','','','','' ],
                    [{text:'INSTRUCTOR SIGN:',style:'subheader',margin: [0,0,5,0],colSpan:4}, '','','',{image:$scope.getImage('form[1].instructorSign'),colSpan:4,width: 70},'','','',{text:'CANDIDATE SIGN:',style:'subheader',margin: [0,0,5,0],colSpan:4 },'','','',{image:$scope.getImage('form[1].candidateSign'),colSpan:4,width: 70},'','','' ],
                ]
              }
            },
           {text:'Demonstrate basic driving skills',alignment:'center',pageBreak: 'before',},
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','auto' ,'*','*' ],
                body: [
                  [ 'NAME:',$scope.get('form[2].name'), 'NUMBER:',$scope.get('form[2].number'), 'INSTRUCTOR',$scope.get('form[2].instructor') ],
                  [ 'VEHICLE:',$scope.get('form[2].vehicle'), 'DATE:',{text:$scope.get('form[2].date'),colSpan:3},'','']
                ]
              }
            },
           '\n',
           {text:[{text:'Range statement: –',bold:true},
           {text:'A typical variety of road and traffic conditions within statutory speed limits', style: 'small'}]},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text: '1) Basic vehicle checks', style: 'small'},$scope.getYes('form[3].t11'),'',{text:$scope.get('form[3].feedback'),rowSpan:13, style: 'small'}],
                  [ {text: '2) Familiarise with vehicle controls', style: 'small'} ,$scope.getYes('form[3].t12'),$scope.getNo('form[3].t12'),''],
                    [ {text: '3) Anticipation and planning', style: 'small'} ,$scope.getYes('form[3].t13'),$scope.getNo('form[3].t13'),''],
                    [ {text: '4) Steer the vehicle accurately', style: 'small'} ,$scope.getYes('form[3].t14'),$scope.getNo('form[3].t14'),''],
                    [ {text: '5) Control accelerator, brakes, gears clutch', style: 'small'} ,$scope.getYes('form[3].t15'),$scope.getNo('form[3].t15'),''],
                    [ {text: '6) Progress appropriate to the conditions', style: 'small'} ,$scope.getYes('form[3].t16'),$scope.getNo('form[3].t16'),''],
                    [ {text: '7) Approach and negotiate corners safely', style: 'small'} ,$scope.getYes('form[3].t17'),$scope.getNo('form[3].t17'),''],
                    [ {text: '8) Position the vehicle safely as appropriate', style: 'small'} ,$scope.getYes('form[3].t18'),$scope.getNo('form[3].t18'),''],
                    [ {text: '9) Signals use and response to others', style: 'small'} ,$scope.getYes('form[3].t19'),$scope.getNo('form[3].t19'),''],
                    [ {text: '10) Safe locations to park and manoeuvre', style: 'small'} ,$scope.getYes('form[3].t110'),$scope.getNo('form[3].t110'),''],
                    [ {text: '11) Call on the assistance of others', style: 'small'} ,$scope.getYes('form[3].t111'),$scope.getNo('form[3].t111'),''],
                    [ {text: '12) Reverse, manoeuvre and park the vehicle', style: 'small'}     ,$scope.getYes('form[3].t112'),$scope.getNo('form[3].t112'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a'},$scope.getYes('form[3].t113'),$scope.getNo('form[3].t113'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[3].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[3].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           '\n',
           {text:'Undertake an emergency response drive',style:'subheader'},
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:2},'',{text:'Multi Lane', style: 'small'} ,$scope.getYes('form[4].multilane'), {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'},$scope.getYes('form[4].speed0'),
                       {text:'Day', style: 'small'},$scope.getYes('form[4].location0'),
                       {text:'Urban', style: 'small'},$scope.getYes('form[4].urban'),
                       {text:'Good', style: 'small'},$scope.getYes('form[4].surface0'),
                       {text:'Low', style: 'small'},$scope.getYes('form[4].traffic0'),
                       {text:'Good', style: 'small'},$scope.getYes('form[4].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'},$scope.getYes('form[4].speed1'),
                       {text:'Night', style: 'small'},$scope.getYes('form[4].location1'),
                       {text:'Rural', style: 'small'},$scope.getYes('form[4].rural'),
                       {text:'Poor', style: 'small'},$scope.getYes('form[4].surface1'),
                       {text:'High', style: 'small'},$scope.getYes('form[4].traffic1'),
                       {text:'Poor', style: 'small'},$scope.getYes('form[4].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Is justifiable and should be maintained', style: 'small'} ,$scope.getYes('form[5].t21'),$scope.getNo('form[5].t21'),{text:$scope.get('form[5].feedback'),rowSpan:8}],
                  [ {text:'2) justification for speed exemptions', style: 'small'} ,$scope.getYes('form[5].t22'),$scope.getNo('form[5].t22'),''],
                    [ {text:'3) effective tones (HSDT 1.4 – 3)', style: 'small'} ,$scope.getYes('form[5].t23'),$scope.getNo('form[5].t23'),''],
                    [ {text:'4)  Anticipate, others reaction (HSDT 1.4 – 4)', style: 'small'} ,$scope.getYes('form[5].t24'),$scope.getNo('form[5].t24'),''],
                    [ {text:'5) appropriate progress           \n(HSDT 1.4 – 5)', style: 'small'} ,$scope.getYes('form[5].t25'),$scope.getNo('form[5].t25'),''],
                    [ {text:'6) maintain communication       \n(HSDT 1.4 – 6)', style: 'small'} ,$scope.getYes('form[5].t26'),$scope.getNo('form[5].t26'),''],
                    [ {text:'7) duty of care with exemptions\n(HSDT 1.4 –7)', style: 'small'} ,$scope.getYes('form[5].t27'),$scope.getNo('form[5].t27'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',margin: [2,2,2,2]},$scope.getYes('form[5].t28'),$scope.getNo('form[5].t28'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[5].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[5].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'Drivers licence and restrictions',style:'subheader',pageBreak: 'before'},
           {
              table: {
                widths: [ 'auto', '*', 'auto',100 ],
                body: [
                  [ {text:'Drivers Name',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].dname'), {text:'HRMS',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[6].hrms') ],
                ]
              }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Driving Licence No',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[6].dLicenceNo') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Address',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[6].Address') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'Cat C Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].cExpiry0'),{text:'Cat C+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].cExpiry1'),{text:'Cat C1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].cExpiry2') ],
                    [ {text:'Cat C Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].cCodes0'),{text:'Cat C+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].cCodes1'),{text:'Cat C1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].cCodes2') ],
                    [ {text:'Cat B Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].bExpiry0'),{text:'Cat B+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].bExpiry1'),{text:'Cat D/D1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].bExpiry2') ],
                    [ {text:'Cat B Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].bCodes0'),{text:'Cat B+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].bCodes1'),{text:'Cat D/D1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[6].bCodes2') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'20.5m Eye Check',fillColor: '#ffa07a',margin:[0,0,3,0]},$scope.getYes('form[6].eyeCheck'),{text:'Photo card expiry check',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.getYes('form[6].cardExpiry'),{text:'Date of Birth',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[6].DOB') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Endorsement and DVLA \ncheck',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[6].dvlaCheck') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           '\n',
           {text:'Drive at high speed on Motorway and multi lane carriageways\n',style:'subheader'},
           {
              table: {
                widths: [ 'auto', '*','auto','*' ],
                body: [
                  [ {text:'VEHICLE:',margin:[5,0,5,0]},$scope.get('form[7].vehicle'),{text:'DATE:',margin:[15,0,15,0]},$scope.get('form[7].date') ]
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:4},'','','', {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'},$scope.getYes('form[8].speed0'),
                       {text:'Multi Lane', style: 'small'},$scope.getYes('form[8].location0'),
                       {text:'Rural', style: 'small'},$scope.getYes('form[8].location2'),
                       {text:'Good', style: 'small'},$scope.getYes('form[8].surface0'),
                       {text:'Low', style: 'small'},$scope.getYes('form[8].traffic0'),
                       {text:'Good', style: 'small'},$scope.getYes('form[8].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'},$scope.getYes('form[8].speed1'),
                       {text:'Motorway', style: 'small'},$scope.getYes('form[8].location1'),
                       {text:'Rural', style: 'small'},$scope.getYes('form[8].location3'),
                       {text:'Poor', style: 'small'},$scope.getYes('form[8].surface1'),
                       {text:'High', style: 'small'},$scope.getYes('form[8].traffic1'),
                       {text:'Poor', style: 'small'},$scope.getYes('form[8].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Joining motorway / multi carriageway road', style: 'small'} ,$scope.getYes('form[9].t31'),'',{text:$scope.get('form[9].feedback'),rowSpan:6, style: 'small'}],
                  [ {text:'2) Adopt the correct lane or position', style: 'small'} ,$scope.getYes('form[9].t32'),'',''],
                    [ {text:'3)  Adjust speed appropriately', style: 'small'} ,$scope.getYes('form[9].t33'),'',''],
                    [ {text:'4) Correct procedure for exiting', style: 'small'} ,$scope.getYes('form[9].t34'),'',''],
                    [ {text:'5) Understand the relevant highway code', style: 'small'} ,$scope.getYes('form[9].t35'),'',''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',margin: [2,2,2,2]},{text:$scope.getYes('form[9].t36'),style:'subheader'},'',''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                  pageBreak: 'after',
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[9].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[9].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'',pageBreak: 'before'},
           {
              table: {
                headerRows: 1,
                  pageBreak: 'before',
                widths: [ '*' ],
                body: [
                  [ {text:'Feedback / Development',style:'subheader',fillColor: '#ffa07a',margin: [5,5,5,5]} ],
                  [ {text:$scope.get('form[10].feedback'),style:'small',rowSpan:10} ],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],[''],[''],['']
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[10].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[10].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
       ],
        images:{
tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABYDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEFAgQGB//EACcQAAEDBAEEAAcAAAAAAAAAAAECAwQABQYRIRITMUEHNUJRcYGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD3V65QY82PCemx25cnq7DC3Uhx3pG1dKd7VocnVcfdL7LyPI3sVsD7kduN82ujR5YB8MtHx3T7P0gH34x+I+EyMlt0ebZktR8ihPtuRZmwhQAVykq1vpHUVa+48ejdYXizeI44xbUr70gkuy5Ht95XKln+fgCkOLWBbY1shNQobKGo7Q0hA5/ZJ5JPkk8kkk0rdpTUxHulKVItTSlKo//Z'
//            tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QB4RXhpZgAATU0AKgAAAAgABgExAAIAAAARAAAAVgMBAAUAAAABAAAAaAMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAOxFESAAQAAAABAAAOxAAAAAB3d3cuaW5rc2NhcGUub3JnAAAAAYagAACxj//bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIABEAEgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP36LhgRz+Vfih/wVl/bh+KP/BVj/goJZfsL/syeJL3w7o2mSPJ8T/GenPIRbRRFRcw+ZEwItoN6xyLuQz3MiQEqoJk8v/b9/wCDl79pr9hP9pj9oL4UfET4a+HvD+r3NgbT4eXGl3Bki0AOJFg1RZpYv+JhHLG4kBZYwssGwxp+8jX7T/4NhP8AgmkP2LP2FLf4heKYZJ/il8b1j8RavcXKE3NlYtueztS7fMSUf7RITgmS4Knd5asVcEzofB//AAa7fsbeGvCWl6befD3W9bu9PtIrabUbrxRqUc9+6IFaeRYp0jV3ILEIiqCxwoGACv0MCAADniiiwrH84H/B7p/ydN8D/wDsU73/ANLBX9Gnh/8A5Aln/wBcI/8A0EUUUIEXKKKKYz//2Q=='
               },
       styles: {
         header: {
           fontSize: 18,
           bold: true,
           alignment:'center' 
         },
           subheader: {
           fontSize: 14,
           bold: true,
           alignment:'center' 
         },
         anotherStyle: {
           italic: true,
           alignment: 'right'
         },
         small: {
            fontSize:10,
         },
         paragraph:{
           fontSize:10,
         }   
       }
    };
    console.log(docDefinition);
}
else if(index==1)
{
    var docDefinition = {
       pageSize: 'A4',
       header: function(currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element
            if(currentPage==1)
           {
            return { text: 'COMPETENCY ASSESSMENT', style: 'header',margin: [0,8] };
           }
            return { text: '', style: 'header',margin: [0,8] };
      },
      footer: function(currentPage, pageCount) { return {text: currentPage.toString(),alignment:'center' }},
       content: [
           {text:'Demonstrate basic driving skills',alignment:'center'},
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','auto' ,'*','*' ],
                body: [
                  [ 'NAME:',$scope.get('form[0].name'), 'NUMBER:',$scope.get('form[0].number'), 'INSTRUCTOR',$scope.get('form[0].instructor') ],
                  [ 'VEHICLE:',$scope.get('form[0].vehicle'), 'DATE:',{text:$scope.get('form[0].date'),colSpan:3},'','']
                ]
              }
            },
           '\n',
           {text:[{text:'Range statement: –',bold:true},
           {text:'A typical variety of road and traffic conditions within statutory speed limits', style: 'small'} ]},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Basic vehicle checks', style: 'small'} ,$scope.getYes('form[1].t11'),'',{text:$scope.get('form[1].feedback'),rowSpan:13}],
                  [ {text:'2) Familiarise with vehicle controls', style: 'small'} ,$scope.getYes('form[1].t12'),$scope.getNo('form[1].t12'),''],
                    [ {text:'3) Anticipation and planning', style: 'small'} ,$scope.getYes('form[1].t13'),$scope.getNo('form[1].t13'),''],
                    [ {text:'4) Steer the vehicle accurately', style: 'small'} ,$scope.getYes('form[1].t14'),$scope.getNo('form[1].t14'),''],
                    [ {text:'5) Control accelerator, brakes, gears clutch', style: 'small'} ,$scope.getYes('form[1].t15'),$scope.getNo('form[1].t15'),''],
                    [ {text:'6) Progress appropriate to the conditions', style: 'small'} ,$scope.getYes('form[1].t16'),$scope.getNo('form[1].t16'),''],
                    [ {text:'7) Approach and negotiate corners safely', style: 'small'} ,$scope.getYes('form[1].t17'),$scope.getNo('form[1].t17'),''],
                    [ {text:'8) Position the vehicle safely as appropriate', style: 'small'} ,$scope.getYes('form[1].t18'),$scope.getNo('form[1].t18'),''],
                    [ {text:'9) Signals use and response to others', style: 'small'} ,$scope.getYes('form[1].t19'),$scope.getNo('form[1].t19'),''],
                    [ {text:'10) Safe locations to park and manoeuvre', style: 'small'} ,$scope.getYes('form[1].t110'),$scope.getNo('form[1].t110'),''],
                    [ {text:'11) Call on the assistance of others', style: 'small'} ,$scope.getYes('form[1].t111'),$scope.getNo('form[1].t111'),''],
                    [ {text:'12) Reverse, manoeuvre and park the vehicle', style: 'small'} ,$scope.getYes('form[1].t112'),$scope.getNo('form[1].t112'),''],
                    [ {text:'13) Hitch/unhitch safely ', style: 'small'} ,$scope.getYes('form[1].t113'),$scope.getNo('form[1].t113'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a'},$scope.getYes('form[1].t114'),$scope.getNo('form[1].t114'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           '\n',
           {text:'Drive on Motorway and multi-lane carriageways carriageways\n',style:'subheader'},
           {
              table: {
                widths: [ 'auto', 100,'auto','*' ],
                body: [
                  [ {text:'VEHICLE:',margin:[5,0,5,0]},$scope.get('form[2].vehicle'),{text:'DATE:',margin:[15,0,15,0]},$scope.get('form[2].date') ],
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:4},'','','', {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[3].speed0'),
                     {text:'Multi Lane', style: 'small'} ,$scope.getYes('form[3].location0'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[3].location2'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[3].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[3].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[3].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[3].speed1'),
                      {text:'Motorway', style: 'small'} ,$scope.getYes('form[3].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[3].location3'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[3].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[3].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[3].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Joining motorway / multi carriageway road', style: 'small'} ,$scope.getYes('form[4].t31'),$scope.getNo('form[4].t31'),{text:$scope.get('form[4].feedback'),rowSpan:6}],
                  [ {text:'2) Adopt the correct lane or position', style: 'small'} ,$scope.getYes('form[4].t32'),$scope.getNo('form[4].t32'),''],
                    [ {text:'3)  Adjust speed appropriately', style: 'small'} ,$scope.getYes('form[4].t33'),$scope.getNo('form[4].t33'),''],
                    [ {text:'4) Correct procedure for exiting', style: 'small'} ,$scope.getYes('form[4].t34'),$scope.getNo('form[4].t34'),''],
                    [ {text:'5) Understand the relevant highway code', style: 'small'} ,$scope.getYes('form[4].t35'),$scope.getNo('form[4].t35'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',margin: [2,2,2,2]},{text:$scope.getYes('form[4].t36'),style:'subheader'},$scope.getNo('form[4].t36'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                  pageBreak: 'after',
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[4].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[4].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
           {text:'Drivers licence and restrictions',style:'subheader',pageBreak: 'before'},
           {
              table: {
                widths: [ 'auto', '*', 'auto',100 ],
                body: [
                  [ {text:'Drivers Name',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].dname'), {text:'HRMS',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].hrms') ],
                ]
              }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Driving Licence No',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].dLicenceNo') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Address',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].Address') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'Cat C Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cExpiry0'),{text:'Cat C+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cExpiry1'),{text:'Cat C1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cExpiry2') ],
                    [ {text:'Cat C Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cCodes0'),{text:'Cat C+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cCodes1'),{text:'Cat C1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cCodes2') ],
                    [ {text:'Cat B Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bExpiry0'),{text:'Cat B+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bExpiry1'),{text:'Cat D/D1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bExpiry2') ],
                    [ {text:'Cat B Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bCodes0'),{text:'Cat B+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bCodes1'),{text:'Cat D/D1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bCodes2') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'20.5m Eye Check',fillColor: '#ffa07a',margin:[0,0,3,0]},$scope.getYes('form[5].eyeCheck'),{text:'Photo card expiry check',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.getYes('form[5].cardExpiry'),{text:'Date of Birth',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].DOB') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Endorsement and DVLA \ncheck',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].dvlaCheck') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'',pageBreak: 'before'},
           {
              table: {
                headerRows: 1,
                  pageBreak: 'before',
                widths: [ '*' ],
                body: [
                  [ {text:'Feedback / Development',style:'subheader',fillColor: '#ffa07a',margin: [5,5,5,5]} ],
                  [ {text:$scope.get('form[6].feedback'),style:'small',rowSpan:10} ],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],[''],[''],['']
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[6].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[6].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
       ],
        images:{ tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABYDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEFAgQGB//EACcQAAEDBAEEAAcAAAAAAAAAAAECAwQABQYRIRITMUEHNUJRcYGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD3V65QY82PCemx25cnq7DC3Uhx3pG1dKd7VocnVcfdL7LyPI3sVsD7kduN82ujR5YB8MtHx3T7P0gH34x+I+EyMlt0ebZktR8ihPtuRZmwhQAVykq1vpHUVa+48ejdYXizeI44xbUr70gkuy5Ht95XKln+fgCkOLWBbY1shNQobKGo7Q0hA5/ZJ5JPkk8kkk0rdpTUxHulKVItTSlKo//Z'
               },
       styles: {
         header: {
           fontSize: 18,
           bold: true,
           alignment:'center' 
         },
           subheader: {
           fontSize: 14,
           bold: true,
           alignment:'center' 
         },
         anotherStyle: {
           italic: true,
           alignment: 'right'
         },
        small: {
            fontSize:10,
         },
        paragraph:{
        fontSize:10,
       }   
       }
    };
}
else if(index==2)
{
    var docDefinition = {
       pageSize: 'A4',
       header: function(currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element
            if(currentPage==1)
           {
            return { text: 'COMPETENCY ASSESSMENT', style: 'header',margin: [0,8] };
           }
            return { text: '', style: 'header' };
      },
      footer: function(currentPage, pageCount) { return {text: currentPage.toString(),alignment:'center' }},
       content: [
           {text:'Demonstrate basic driving skills',style: 'header'},
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','auto' ,'*','*' ],
                body: [
                  [ 'NAME:',$scope.get('form[0].name'), 'NUMBER:',$scope.get('form[0].number'), 'INSTRUCTOR',$scope.get('form[0].instructor') ],
                  [ 'VEHICLE:',$scope.get('form[0].vehicle'), 'DATE:',{text:$scope.get('form[0].date'),colSpan:3},'','']
                ]
              }
            },
           '\n',
           {text:[{text:'Range statement: –',bold:true},
           {text:'A typical variety of road and traffic conditions within statutory speed limits', style: 'small'}]},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Basic vehicle checks', style: 'small'} ,$scope.getYes('form[1].t11'),'',{text:$scope.get('form[1].feedback'),rowSpan:13}],
                  [ {text:'2) Familiarise with vehicle controls', style: 'small'} ,$scope.getYes('form[1].t12'),$scope.getNo('form[1].t12'),''],
                    [ {text:'3) Anticipation and planning', style: 'small'} ,$scope.getYes('form[1].t13'),$scope.getNo('form[1].t13'),''],
                    [ {text:'4) Steer the vehicle accurately', style: 'small'} ,$scope.getYes('form[1].t14'),$scope.getNo('form[1].t14'),''],
                    [ {text:'5) Control accelerator, brakes, gears clutch', style: 'small'} ,$scope.getYes('form[1].t15'),$scope.getNo('form[1].t15'),''],
                    [ {text:'6) Progress appropriate to the conditions', style: 'small'} ,$scope.getYes('form[1].t16'),$scope.getNo('form[1].t16'),''],
                    [ {text:'7) Approach and negotiate corners safely', style: 'small'} ,$scope.getYes('form[1].t17'),$scope.getNo('form[1].t17'),''],
                    [ {text:'8) Position the vehicle safely as appropriate', style: 'small'} ,$scope.getYes('form[1].t18'),$scope.getNo('form[1].t18'),''],
                    [ {text:'9) Signals use and response to others', style: 'small'} ,$scope.getYes('form[1].t19'),$scope.getNo('form[1].t19'),''],
                    [ {text:'10) Safe locations to park and manoeuvre', style: 'small'} ,$scope.getYes('form[1].t110'),$scope.getNo('form[1].t110'),''],
                    [ {text:'11) Call on the assistance of others', style: 'small'} ,$scope.getYes('form[1].t111'),$scope.getNo('form[1].t111'),''],
                    [ {text:'12) Reverse, manoeuvre and park the vehicle', style: 'small'} ,$scope.getYes('form[1].t112'),$scope.getNo('form[1].t112'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a'},$scope.getYes('form[1].t113'),$scope.getNo('form[1].t113'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           '\n',
           {text:'Undertake an emergency response drive',style:'subheader'},
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:2},'',{text:'Multi Lane'},$scope.getYes('form[2].multilane'), {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[2].speed0'),
                     {text:'Day', style: 'small'} ,$scope.getYes('form[2].location0'),
                      {text:'Urban', style: 'small'} ,$scope.getYes('form[2].urban'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[2].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[2].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[2].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[2].speed1'),
                      {text:'Night', style: 'small'} ,$scope.getYes('form[2].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[2].rural'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[2].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[2].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[2].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Is justifiable and should be maintained', style: 'small'} ,$scope.getYes('form[3].t21'),$scope.getNo('form[3].t21'),{text:$scope.get('form[3].feedback'),rowSpan:8}],
                  [ {text:'2) justification for speed exemptions', style: 'small'} ,$scope.getYes('form[3].t22'),$scope.getNo('form[3].t22'),''],
                    [ {text:'3) effective tones (HSDT 1.4 – 3)', style: 'small'} ,$scope.getYes('form[3].t23'),$scope.getNo('form[3].t23'),''],
                    [ {text:'4)  Anticipate, others reaction (HSDT 1.4 – 4)', style: 'small'} ,$scope.getYes('form[3].t24'),$scope.getNo('form[3].t24'),''],
                    [ {text:'5) appropriate progress           \n(HSDT 1.4 – 5)', style: 'small'} ,$scope.getYes('form[3].t25'),$scope.getNo('form[3].t25'),''],
                    [ {text:'6) maintain communication       \n(HSDT 1.4 – 6)', style: 'small'} ,$scope.getYes('form[3].t26'),$scope.getNo('form[3].t26'),''],
                    [ {text:'7) duty of care with exemptions\n(HSDT 1.4 –7)', style: 'small'} ,$scope.getYes('form[3].t27'),$scope.getNo('form[3].t27'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',margin: [2,2,2,2]},$scope.getYes('form[3].t28'),$scope.getNo('form[3].t28'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[3].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[3].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
           
           {text:'Drivers licence and restrictions',style:'subheader',pageBreak: 'before'},
           {
              table: {
                widths: [ 'auto', '*', 'auto',100 ],
                body: [
                  [ {text:'Drivers Name',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].dname'), {text:'HRMS',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].hrms') ],
                ]
              }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Driving Licence No',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].dLicenceNo') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Address',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].Address') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'Cat C Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cExpiry0'),{text:'Cat C+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cExpiry1'),{text:'Cat C1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cExpiry2') ],
                    [ {text:'Cat C Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cCodes0'),{text:'Cat C+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cCodes1'),{text:'Cat C1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cCodes2') ],
                    [ {text:'Cat B Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bExpiry0'),{text:'Cat B+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bExpiry1'),{text:'Cat D/D1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bExpiry2') ],
                    [ {text:'Cat B Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bCodes0'),{text:'Cat B+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bCodes1'),{text:'Cat D/D1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bCodes2') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'20.5m Eye Check',fillColor: '#ffa07a',margin:[0,0,3,0]},$scope.getYes('form[4].eyeCheck'),{text:'Photo card expiry check',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.getYes('form[4].cardExpiry'),{text:'Date of Birth',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].DOB') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Endorsement and DVLA \ncheck',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].dvlaCheck') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'',pageBreak: 'before'},
           {
              table: {
                headerRows: 1,
                  pageBreak: 'before',
                widths: [ '*' ],
                body: [
                  [ {text:'Feedback / Development',style:'subheader',fillColor: '#ffa07a',margin: [5,5,5,5]} ],
                  [ {text:$scope.get('form[5].feedback'),style:'subheader',rowSpan:10, style: 'small'} ],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],[''],[''],['']
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[5].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[5].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
       ],
        images:{ tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABYDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEFAgQGB//EACcQAAEDBAEEAAcAAAAAAAAAAAECAwQABQYRIRITMUEHNUJRcYGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD3V65QY82PCemx25cnq7DC3Uhx3pG1dKd7VocnVcfdL7LyPI3sVsD7kduN82ujR5YB8MtHx3T7P0gH34x+I+EyMlt0ebZktR8ihPtuRZmwhQAVykq1vpHUVa+48ejdYXizeI44xbUr70gkuy5Ht95XKln+fgCkOLWBbY1shNQobKGo7Q0hA5/ZJ5JPkk8kkk0rdpTUxHulKVItTSlKo//Z'
               },
       styles: {
         header: {
           fontSize: 18,
           bold: true,
           alignment:'center' 
         },
           subheader: {
           fontSize: 14,
           bold: true,
           alignment:'center' 
         },
         anotherStyle: {
           italic: true,
           alignment: 'right'
         },
        small: {
            fontSize:10,
        },         
        paragraph:{
        fontSize:10,
       }   
       }
    };
}
else if(index==3)
{
    var docDefinition = {
       pageSize: 'A4',
       header: function(currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element
            if(currentPage==1)
           {
            return { text: 'COMPETENCY ASSESSMENT', style: 'header',margin: [0,8] };
           }
            return { text: '', style: 'header' };
      },
      footer: function(currentPage, pageCount) { return {text: currentPage.toString(),alignment:'center' }},
       content: [
           {text:'Demonstrate basic driving skills', style: 'header'},
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','auto' ,'*','*' ],
                body: [
                  [ 'NAME:',$scope.get('form[0].name'), 'NUMBER:',$scope.get('form[0].number'), 'INSTRUCTOR',$scope.get('form[0].instructor') ],
                  [ 'VEHICLE:',$scope.get('form[0].vehicle'), 'DATE:',{text:$scope.get('form[0].date'),colSpan:3},'','']
                ]
              }
            },
           '\n',
           {text:[{text:'Range statement: –',bold:true},
           {text:'A typical variety of road and traffic conditions within statutory speed limits', style: 'small'} ]},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Basic vehicle checks', style: 'small'} ,$scope.getYes('form[1].t11'),'',{text:$scope.get('form[1].feedback'),rowSpan:13}],
                  [ {text:'2) Familiarise with vehicle controls', style: 'small'} ,$scope.getYes('form[1].t12'),$scope.getNo('form[1].t12'),''],
                    [ {text:'3) Anticipation and planning', style: 'small'} ,$scope.getYes('form[1].t13'),$scope.getNo('form[1].t13'),''],
                    [ {text:'4) Steer the vehicle accurately', style: 'small'} ,$scope.getYes('form[1].t14'),$scope.getNo('form[1].t14'),''],
                    [ {text:'5) Control accelerator, brakes, gears clutch', style: 'small'} ,$scope.getYes('form[1].t15'),$scope.getNo('form[1].t15'),''],
                    [ {text:'6) Progress appropriate to the conditions', style: 'small'} ,$scope.getYes('form[1].t16'),$scope.getNo('form[1].t16'),''],
                    [ {text:'7) Approach and negotiate corners safely', style: 'small'} ,$scope.getYes('form[1].t17'),$scope.getNo('form[1].t17'),''],
                    [ {text:'8) Position the vehicle safely as appropriate', style: 'small'} ,$scope.getYes('form[1].t18'),$scope.getNo('form[1].t18'),''],
                    [ {text:'9) Signals use and response to others', style: 'small'} ,$scope.getYes('form[1].t19'),$scope.getNo('form[1].t19'),''],
                    [ {text:'10) Safe locations to park and manoeuvre', style: 'small'} ,$scope.getYes('form[1].t110'),$scope.getNo('form[1].t110'),''],
                    [ {text:'11) Call on the assistance of others', style: 'small'} ,$scope.getYes('form[1].t111'),$scope.getNo('form[1].t111'),''],
                    [ {text:'12) Reverse, manoeuvre and park the vehicle', style: 'small'} ,$scope.getYes('form[1].t112'),$scope.getNo('form[1].t112'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a'},$scope.getYes('form[1].t113'),$scope.getNo('form[1].t113'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           '\n',
           {text:'Undertake an emergency response drive',style:'subheader'},
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:2},'',{text:'Multi Lane'},$scope.getYes('form[2].multilane'), {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[2].speed0'),
                     {text:'Day', style: 'small'} ,$scope.getYes('form[2].location0'),
                      {text:'Urban', style: 'small'} ,$scope.getYes('form[2].urban'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[2].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[2].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[2].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[2].speed1'),
                      {text:'Night', style: 'small'} ,$scope.getYes('form[2].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[2].rural'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[2].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[2].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[2].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Is justifiable and should be maintained', style: 'small'} ,$scope.getYes('form[3].t21'),$scope.getNo('form[3].t21'),{text:$scope.get('form[3].feedback'),rowSpan:8}],
                  [ {text:'2) justification for speed exemptions', style: 'small'} ,$scope.getYes('form[3].t22'),$scope.getNo('form[3].t22'),''],
                    [ {text:'3) effective tones (HSDT 1.4 – 3)', style: 'small'} ,$scope.getYes('form[3].t23'),$scope.getNo('form[3].t23'),''],
                    [ {text:'4)  Anticipate, others reaction (HSDT 1.4 – 4)', style: 'small'} ,$scope.getYes('form[3].t24'),$scope.getNo('form[3].t24'),''],
                    [ {text:'5) appropriate progress           \n(HSDT 1.4 – 5)', style: 'small'} ,$scope.getYes('form[3].t25'),$scope.getNo('form[3].t25'),''],
                    [ {text:'6) maintain communication       \n(HSDT 1.4 – 6)', style: 'small'} ,$scope.getYes('form[3].t26'),$scope.getNo('form[3].t26'),''],
                    [ {text:'7) duty of care with exemptions\n(HSDT 1.4 –7)', style: 'small'} ,$scope.getYes('form[3].t27'),$scope.getNo('form[3].t27'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',margin: [2,2,2,2]},$scope.getYes('form[3].t28'),$scope.getNo('form[3].t28'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[3].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[3].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
           
           {text:'Drivers licence and restrictions',style:'subheader',pageBreak: 'before'},
           {
              table: {
                widths: [ 'auto', '*', 'auto',100 ],
                body: [
                  [ {text:'Drivers Name',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].dname'), {text:'HRMS',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].hrms') ],
                ]
              }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Driving Licence No',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].dLicenceNo') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Address',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].Address') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'Cat C Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cExpiry0'),{text:'Cat C+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cExpiry1'),{text:'Cat C1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cExpiry2') ],
                    [ {text:'Cat C Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cCodes0'),{text:'Cat C+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cCodes1'),{text:'Cat C1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].cCodes2') ],
                    [ {text:'Cat B Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bExpiry0'),{text:'Cat B+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bExpiry1'),{text:'Cat D/D1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bExpiry2') ],
                    [ {text:'Cat B Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bCodes0'),{text:'Cat B+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bCodes1'),{text:'Cat D/D1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[4].bCodes2') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'20.5m Eye Check',fillColor: '#ffa07a',margin:[0,0,3,0]},$scope.getYes('form[4].eyeCheck'),{text:'Photo card expiry check',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.getYes('form[4].cardExpiry'),{text:'Date of Birth',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].DOB') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Endorsement and DVLA \ncheck',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[4].dvlaCheck') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'',pageBreak: 'before'},
           {
              table: {
                headerRows: 1,
                  pageBreak: 'before',
                widths: [ '*' ],
                body: [
                  [ {text:'Feedback / Development',style:'subheader',fillColor: '#ffa07a',margin: [5,5,5,5]} ],
                  [ {text:$scope.get('form[5].feedback'),rowSpan:10, style: 'small'}  ],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],[''],[''],['']
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[5].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[5].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
       ],
        images:{ tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABYDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEFAgQGB//EACcQAAEDBAEEAAcAAAAAAAAAAAECAwQABQYRIRITMUEHNUJRcYGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD3V65QY82PCemx25cnq7DC3Uhx3pG1dKd7VocnVcfdL7LyPI3sVsD7kduN82ujR5YB8MtHx3T7P0gH34x+I+EyMlt0ebZktR8ihPtuRZmwhQAVykq1vpHUVa+48ejdYXizeI44xbUr70gkuy5Ht95XKln+fgCkOLWBbY1shNQobKGo7Q0hA5/ZJ5JPkk8kkk0rdpTUxHulKVItTSlKo//Z'
               },
       styles: {
         header: {
           fontSize: 18,
           bold: true,
           alignment:'center' 
         },
           subheader: {
           fontSize: 14,
           bold: true,
           alignment:'center' 
         },
         anotherStyle: {
           italic: true,
           alignment: 'right'
         },
        small: {
            fontSize:10,
        },   
        paragraph:{
        fontSize:10,
       }   
       }
    };
}
else if(index==4)
{
    var docDefinition = {
       pageSize: 'A4',
       header: function(currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element
            if(currentPage==1)
           {
            return { text: 'COMPETENCY ASSESSMENT', style: 'header',margin: [0,8] };
           }
            return { text: '', style: 'header' };
      },
      footer: function(currentPage, pageCount) { return {text: currentPage.toString(),alignment:'center' }},
       content: [
           {text:'Demonstrate basic driving skills', style: 'header'},
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','auto' ,'*','*' ],
                body: [
                  [ 'NAME:',$scope.get('form[0].name'), 'NUMBER:',$scope.get('form[0].number'), 'INSTRUCTOR',$scope.get('form[0].instructor') ],
                  [ 'VEHICLE:',$scope.get('form[0].vehicle'), 'DATE:',{text:$scope.get('form[0].date'),colSpan:3},'','']
                ]
              }
            },
           '\n',
           {text:[{text:'Range statement: –',bold:true},
           {text:'A typical variety of road and traffic conditions within statutory speed limits', style: 'small'} ]},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Basic vehicle checks', style: 'small'} ,$scope.getYes('form[1].t11'),'',{text:$scope.get('form[1].feedback'),rowSpan:13}],
                  [ {text:'2) Familiarise with vehicle controls', style: 'small'} ,$scope.getYes('form[1].t12'),$scope.getNo('form[1].t12'),''],
                    [ {text:'3) Anticipation and planning', style: 'small'} ,$scope.getYes('form[1].t13'),$scope.getNo('form[1].t13'),''],
                    [ {text:'4) Steer the vehicle accurately', style: 'small'} ,$scope.getYes('form[1].t14'),$scope.getNo('form[1].t14'),''],
                    [ {text:'5) Control accelerator, brakes, gears clutch', style: 'small'} ,$scope.getYes('form[1].t15'),$scope.getNo('form[1].t15'),''],
                    [ {text:'6) Progress appropriate to the conditions', style: 'small'} ,$scope.getYes('form[1].t16'),$scope.getNo('form[1].t16'),''],
                    [ {text:'7) Approach and negotiate corners safely', style: 'small'} ,$scope.getYes('form[1].t17'),$scope.getNo('form[1].t17'),''],
                    [ {text:'8) Position the vehicle safely as appropriate', style: 'small'} ,$scope.getYes('form[1].t18'),$scope.getNo('form[1].t18'),''],
                    [ {text:'9) Signals use and response to others', style: 'small'} ,$scope.getYes('form[1].t19'),$scope.getNo('form[1].t19'),''],
                    [ {text:'10) Safe locations to park and manoeuvre', style: 'small'} ,$scope.getYes('form[1].t110'),$scope.getNo('form[1].t110'),''],
                    [ {text:'11) Call on the assistance of others', style: 'small'} ,$scope.getYes('form[1].t111'),$scope.getNo('form[1].t111'),''],
                    [ {text:'12) Reverse, manoeuvre and park the vehicle', style: 'small'} ,$scope.getYes('form[1].t112'),$scope.getNo('form[1].t112'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a'},$scope.getYes('form[1].t113'),$scope.getNo('form[1].t113'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[1].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           '\n',
           {text:'Drive on Motorway and multi-lane carriageways carriageways\n',style:'subheader'},
           {
              table: {
                widths: [ 'auto', 100,'auto','*' ],
                body: [
                  [ {text:'VEHICLE:',margin:[5,0,5,0]},$scope.get('form[2].vehicle'),{text:'DATE:',margin:[15,0,15,0]},$scope.get('form[2].date') ],
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:4},'','','', {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[3].speed0'),
                     {text:'Multi Lane', style: 'small'} ,$scope.getYes('form[3].location0'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[3].location2'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[3].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[3].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[3].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[3].speed1'),
                      {text:'Motorway', style: 'small'} ,$scope.getYes('form[3].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[3].location3'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[3].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[3].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[3].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', 'auto','auto' ,'*' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'', {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'} ],
                  [ '',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'},''],
                  [ {text:'1) Joining motorway / multi carriageway road', style: 'small'} ,$scope.getYes('form[4].t21'),$scope.getNo('form[4].t21'),{text:$scope.get('form[4].feedback'),rowSpan:6, style: 'small'} ],
                  [ {text:'2) Adopt the correct lane or position', style: 'small'} ,$scope.getYes('form[4].t22'),$scope.getNo('form[4].t22'),''],
                    [ {text:'3)  Adjust speed appropriately', style: 'small'} ,$scope.getYes('form[4].t23'),$scope.getNo('form[4].t23'),''],
                    [ {text:'4) Correct procedure for exiting', style: 'small'} ,$scope.getYes('form[4].t24'),$scope.getNo('form[4].t24'),''],
                    [ {text:'5) Understand the relevant highway code', style: 'small'} ,$scope.getYes('form[4].t25'),$scope.getNo('form[4].t25'),''],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',margin: [2,2,2,2]},{text:$scope.getYes('form[4].t26'),style:'subheader'},$scope.getNo('form[4].t26'),''],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                  pageBreak: 'after',
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[4].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[4].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
           {text:'Drivers licence and restrictions',style:'subheader',pageBreak: 'before'},
           {
              table: {
                widths: [ 'auto', '*', 'auto',100 ],
                body: [
                  [ {text:'Drivers Name',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].dname'), {text:'HRMS',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].hrms') ],
                ]
              }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Driving Licence No',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].dLicenceNo') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Address',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].Address') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'Cat C Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cExpiry0'),{text:'Cat C+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cExpiry1'),{text:'Cat C1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cExpiry2') ],
                    [ {text:'Cat C Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cCodes0'),{text:'Cat C+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cCodes1'),{text:'Cat C1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].cCodes2') ],
                    [ {text:'Cat B Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bExpiry0'),{text:'Cat B+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bExpiry1'),{text:'Cat D/D1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bExpiry2') ],
                    [ {text:'Cat B Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bCodes0'),{text:'Cat B+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bCodes1'),{text:'Cat D/D1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[5].bCodes2') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'20.5m Eye Check',fillColor: '#ffa07a',margin:[0,0,3,0]},$scope.getYes('form[5].eyeCheck'),{text:'Photo card expiry check',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.getYes('form[5].cardExpiry'),{text:'Date of Birth',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].DOB') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Endorsement and DVLA \ncheck',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[5].dvlaCheck') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'',pageBreak: 'before'},
           {
              table: {
                headerRows: 1,
                  pageBreak: 'before',
                widths: [ '*' ],
                body: [
                  [ {text:'Feedback / Development',style:'subheader',fillColor: '#ffa07a',margin: [5,5,5,5]} ],
                  [ {text:$scope.get('form[6].feedback'),style:'small',rowSpan:10} ],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],[''],[''],['']
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[6].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[6].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           
       ],
        images:{ tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABYDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEFAgQGB//EACcQAAEDBAEEAAcAAAAAAAAAAAECAwQABQYRIRITMUEHNUJRcYGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD3V65QY82PCemx25cnq7DC3Uhx3pG1dKd7VocnVcfdL7LyPI3sVsD7kduN82ujR5YB8MtHx3T7P0gH34x+I+EyMlt0ebZktR8ihPtuRZmwhQAVykq1vpHUVa+48ejdYXizeI44xbUr70gkuy5Ht95XKln+fgCkOLWBbY1shNQobKGo7Q0hA5/ZJ5JPkk8kkk0rdpTUxHulKVItTSlKo//Z'
               },
       styles: {
         header: {
           fontSize: 18,
           bold: true,
           alignment:'center' 
         },
           subheader: {
           fontSize: 14,
           bold: true,
           alignment:'center' 
         },
         anotherStyle: {
           italic: true,
           alignment: 'right'
         },
        small: {
            fontSize:10,
        },
        paragraph:{
        fontSize:10,
       }   
       }
    };
}
else if(index==5)
{//f5
    var docDefinition = {
       pageSize: 'A4',
       header: function(currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element
            if(currentPage==1)
           {
            return {text:'ERDT Feedback / Supplementary Evidence Sheet',alignment:'center',margin: [0,8]};
           }
            return { text: '', style: 'header' };
      },
      footer: function(currentPage, pageCount) { return {text: currentPage.toString(),alignment:'center' }},
       content: [
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ 'COURSE:', {text:'',colSpan:7 },'','','','','','' ],
                  [ 'NAME:',$scope.get('form[0].name'), 'NUMBER:',$scope.get('form[0].number'), 'INSTRUCTOR',{text:$scope.get('form[0].instructor'),colSpan:3},'','' ],
                  [ 'VEHICLE:',$scope.get('form[0].vehicle'), 'DATE:',$scope.get('form[0].date'), 'DAY:',$scope.get('form[0].day0'),'OF:',$scope.get('form[0].day1')]
                ]
              }
            },
           '\n',
            {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', '*', '*', '*','*' ,'*','*', '*', '*','*' ,'*','*'  ],
                body: [
                  [ {text:'ERDT ELEMENTS COVERED',colSpan:16,fillColor: '#ffa07a' }, '','','','','','','','','','','','','','','' ],
                  [ {text:'1.1',fillColor: '#ffa07a'},$scope.getYes('form[1].c11'),{text:'1.2a',fillColor: '#ffa07a'},$scope.getYes('form[1].c12a'),{text:'1.2b',fillColor: '#ffa07a'},$scope.getYes('form[1].c12b'),{text:'1.3',fillColor: '#ffa07a'},$scope.getYes('form[1].c13'),{text:'1.4',fillColor: '#ffa07a'},$scope.getYes('form[1].c14'),{text:'1.5',fillColor: '#ffa07a'},$scope.getYes('form[1].c15'),{text:'1.6',fillColor: '#ffa07a'},$scope.getYes('form[1].c16'),{text:'K&U\nA&B',fillColor: '#ffa07a'},{text:'/',alignment:'center'}  ],
                  [ {text:'INSTRUCTOR COMMENTS AND SESSION OUTLINE',colSpan:16,fillColor: '#ffa07a' }, '','','','','','','','','','','','','','','' ],
                    [ {text:'The course was introduced and aims and objectives. Were explained, licence checks completed and copies kept on file.\n'
+'Completion of red kite online assessment covering road craft, driver’s responsibilities, and highway code confirmed and results noted.\n\n'

+'Lecture session covering roadcraft elements: system of vehicle control, limit points, cornering, observation and skid control, and underpinned by a Q & As.\n'
+'Session used to reinforce & confirm students K & U of organisational policy and directives including red traffic light policy, relevant road traffic legislation.\n'
+'Speed, exemptions, motorway procedures, and drivers responsibilities\n'
+'Training vehicle was introduced and knowledge of vehicle checks confirmed through observation and Q &A. (1.1 & 1.2a)\n'
+'Following a short familiarisation drive in the vehicle 1.1 demonstrate basic driving skills this was assessed through direct observation.',colSpan:16,style:'paragraph' }, '','','','','','','','','','','','','','','' ],
                    [ {text:'AGREED DEVELOPMENT POINTS / TRAINING PLAN TO ACHIEVE COMPETENCE',colSpan:16,fillColor: '#ffa07a' }, '','','','','','','','','','','','','','','' ],
                    [ {text:$scope.get('form[1].agreedPoints'),colSpan:16  , style: 'small'}, '','','','','','','','','','','','','','','' ],
                    [ {text:'CANDIDATE COMMENTS',colSpan:16,fillColor: '#ffa07a' }, '','','','','','','','','','','','','','','' ],
                    [ {text:$scope.get('form[1].candidateComments'),colSpan:16  , style: 'small'} , '','','','','','','','','','','','','','','' ],
                    [{text:'INSTRUCTOR SIGN:',style:'subheader',margin: [0,0,5,0],colSpan:4}, '','','',{image:$scope.getImage('form[1].instructorSign'),colSpan:4,width: 70},'','','',{text:'CANDIDATE SIGN:',style:'subheader',margin: [0,0,5,0],colSpan:4 },'','','',{image:$scope.getImage('form[1].candidateSign'),colSpan:4,width: 70},'','','' ],
                ]
              }
            },
           {text:'Drivers licence and restrictions',style:'subheader',pageBreak: 'before'},
           '\n',
           {
              table: {
                widths: [ 'auto', '*', 'auto',100 ],
                body: [
                  [ {text:'Drivers Name',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].dname'), {text:'HRMS',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[2].hrms') ],
                ]
              }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Driving Licence No',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[2].dLicenceNo') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Address',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[2].Address') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'Cat C Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].cExpiry0'),{text:'Cat C+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].cExpiry1'),{text:'Cat C1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].cExpiry2') ],
                    [ {text:'Cat C Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].cCodes0'),{text:'Cat C+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].cCodes1'),{text:'Cat C1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].cCodes2') ],
                    [ {text:'Cat B Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].bExpiry0'),{text:'Cat B+E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].bExpiry1'),{text:'Cat D/D1/E Expiry',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].bExpiry2') ],
                    [ {text:'Cat B Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].bCodes0'),{text:'Cat B+E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].bCodes1'),{text:'Cat D/D1/E Codes',fillColor: '#ffa07a',margin:[0,0,10,0]},$scope.get('form[2].bCodes2') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*','auto', '*','auto', '*' ],
                body: [
                  [ {text:'20.5m Eye Check',fillColor: '#ffa07a',margin:[0,0,3,0]},$scope.getYes('form[2].eyeCheck'),{text:'Photo card expiry check',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.getYes('form[2].cardExpiry'),{text:'Date of Birth',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[2].DOB') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {
              table: {
                widths: [ 'auto', '*' ],
                body: [
                  [ {text:'Endorsement and DVLA \ncheck',fillColor: '#ffa07a',margin:[0,0,20,0]},$scope.get('form[2].dvlaCheck') ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'Record of assessment',alignment:'center',pageBreak: 'before'},
           {text:'ERDT ELEMENT 1.1 Demonstrate basic driving skills',alignment:'center'},
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ 'NAME:',$scope.get('form[3].name'), 'NUMBER:',$scope.get('form[3].number'), 'INSTRUCTOR',{text:$scope.get('form[3].instructor'),colSpan:3},'','' ],
                  [ 'VEHICLE:',$scope.get('form[3].vehicle'), 'DATE:',$scope.get('form[3].date'), 'DAY:',$scope.get('form[3].day0'),'OF:',$scope.get('form[3].day1')]
                ]
              }
            },
           '\n',
           {text:[{text:'Range statement: –',bold:true},
           {text:'A typical variety of road and traffic conditions within statutory speed limits', style: 'small'} ]},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto','*' , 'auto','auto' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'}, {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},''],
                  [ '','',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'}],
                  [ {text:'1) Complete basic vehicle checks, identifying, reporting and documenting obvious defects', style: 'small'} , $scope.get('form[4].t11f'),$scope.getYes('form[4].t11'),$scope.getNo('form[4].t11')],
                  [ {text:'2) Familiarise yourself with the vehicle controls before driving', style: 'small'} , $scope.get('form[4].t12f'),$scope.getYes('form[4].t12'),$scope.getNo('form[4].t12')],
                    [ {text:'3) Recognise, assess and manage hazards through effective observation, anticipation and planning', style: 'small'} , $scope.get('form[4].t13f'),$scope.getYes('form[4].t13'),$scope.getNo('form[4].t13')],
                    [ {text:'4) Steer the vehicle accurately to maintain a safe and appropriate course', style: 'small'} , $scope.get('form[4].t14f'),$scope.getYes('form[4].t14'),$scope.getNo('form[4].t14')],
                    [ {text:'5) Control the vehicle safely and accurately through the use of accelerator, brakes, gears and clutch as appropriate to the circumstances', style: 'small'} , $scope.get('form[4].t15f'),$scope.getYes('form[4].t15'),$scope.getNo('form[4].t15')],
                    [ {text:'6) Make progress appropriate to the conditions and circumstances', style: 'small'} , $scope.get('form[4].t16f'),$scope.getYes('form[4].t16'),$scope.getNo('form[4].t16')],
                    [ {text:'7) Approach and negotiate corners safely', style: 'small'} , $scope.get('form[4].t17f'),$scope.getYes('form[4].t17'),$scope.getNo('form[4].t17')],
                    [ {text:'8) Position the vehicle safely as appropriate to the circumstances', style: 'small'} , $scope.get('form[4].t18f'),$scope.getYes('form[4].t18'),$scope.getNo('form[4].t18')],
                    [ {text:'9) Use appropriate signals and respond correctly to the signals of other road users', style: 'small'} , $scope.get('form[4].t19f'),$scope.getYes('form[4].t19'),$scope.getNo('form[4].t19')],
                    [ {text:'10) Select safe and appropriate locations to park and manoeuvre', style: 'small'} , $scope.get('form[4].t110f'),$scope.getYes('form[4].t110'),$scope.getNo('form[4].t110')],
                    [ {text:'11) Call on the assistance of others before completing difficult manoeuvres', style: 'small'} , $scope.get('form[4].t111f'),$scope.getYes('form[4].t111'),$scope.getNo('form[4].t111')],
                    [ {text:'12) Reverse, manoeuvre and park the vehicle safely', style: 'small'} , $scope.get('form[4].t112f'),$scope.getYes('form[4].t112'),$scope.getNo('form[4].t112')],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',colSpan:2},'',$scope.getYesText('form[4].t113'),$scope.getNoText('form[4].t113')],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[4].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[4].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'Record of assessment',alignment:'center',pageBreak: 'before'},
           {text:'ERDT ELEMENT 1.2a Prepare the vehicle to drive at high speed',alignment:'center'},
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ 'NAME:',$scope.get('form[5].name'), 'NUMBER:',$scope.get('form[5].number'), 'INSTRUCTOR',{text:$scope.get('form[5].instructor'),colSpan:3},'','' ],
                  [ 'VEHICLE:',$scope.get('form[5].vehicle'), 'DATE:',$scope.get('form[5].date'), 'DAY:',$scope.get('form[5].day0'),'OF:',$scope.get('form[5].day1')]
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto','*' , 'auto','auto' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'}, {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'' ],
                  [ '','',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'}],
                  [ {text:'Preparing the vehicle\n8)  Ensure you are authorised to prepare and drive the vehicle', style: 'small'} , $scope.get('form[6].t21f'),$scope.getYes('form[6].t21'),$scope.getNo('form[6].t21')],
                  [ {text:'9) Familiarise yourself with the vehicle and its controls', style: 'small'} , $scope.get('form[6].t22f'),$scope.getYes('form[6].t22'),$scope.getNo('form[6].t22')],
                    [ {text:'10)  carry out required checks to;\nTyres √, Brakes √, Fluid levels √, Lights Sound equipment √, Safety equipment √, Bodywork √, Cleanliness √, Operational equipment √ ', style: 'small'} , $scope.get('form[6].t23f'),$scope.getYes('form[6].t23'),$scope.getNo('form[6].t23')],
                    [ {text:'11) ensure the vehicle is fit for purpose during and after use', style: 'small'} , $scope.get('form[6].t24f'),$scope.getYes('form[6].t24'),$scope.getNo('form[6].t24')],
                    [ {text:'12) identify, report and record any defects or damage prior and following use, and take the correct action in regard to these', style: 'small'} , $scope.get('form[6].t25f'),$scope.getYes('form[6].t25'),$scope.getNo('form[6].t25')],
                    [ {text:'13) ensure that any equipment required to be with the vehicle is present and in working order', style: 'small'} , $scope.get('form[6].t26f'),$scope.getYes('form[6].t26'),$scope.getNo('form[6].t26')],
                    [ {text:'14) Keep accurate and complete documentation as required relating to your use of the vehicle.', style: 'small'} , $scope.get('form[6].t27f'),$scope.getYes('form[6].t27'),$scope.getNo('form[6].t27')],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',colSpan:2},'',$scope.getYesText('form[6].t28'),$scope.getNoText('form[6].t28')],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[6].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[6].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'Record of assessment',alignment:'center',pageBreak: 'before'},
           {text:'ERDT ELEMENT 1.2b Driving the vehicle at high speed',alignment:'center'},
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ 'NAME:',$scope.get('form[7].name'), 'NUMBER:',$scope.get('form[7].number'), 'INSTRUCTOR',{text:$scope.get('form[7].instructor'),colSpan:3},'','' ],
                  [ 'VEHICLE:',$scope.get('form[7].vehicle'), 'DATE:',$scope.get('form[7].date'), 'DAY:',$scope.get('form[7].day0'),'OF:',$scope.get('form[7].day1')]
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:4},'','','', {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[8].speed0'),
                     {text:'Major Roads', style: 'small'} ,$scope.getYes('form[8].location0'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[8].location2'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[8].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[8].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[8].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[8].speed1'),
                      {text:'Minor Roads', style: 'small'} ,$scope.getYes('form[8].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[8].location3'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[8].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[8].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[8].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto','*' , 'auto','auto' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'}, {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'' ],
                  [ '','',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'}],
                  [ {text:'B) Formulating and implementing driving plans\n1) Gather information at an early stage early stage through accurate observations and the use of other senses', style: 'small'} , $scope.get('form[9].t31f'),$scope.getYes('form[9].t31'), $scope.getNo('form[9].t31')],
                  [ {text:'2) use this information to correctly anticipate all driving situations', style: 'small'} , $scope.get('form[9].t32f'),$scope.getYes('form[9].t32'),$scope.getNo('form[9].t32')],
                    [ {text:'3)  use observation links effectively', style: 'small'} , $scope.get('form[9].t33f'),$scope.getYes('form[9].t33'),$scope.getNo('form[9].t33')],
                    [ {text:'4) use information and anticipation to formulate flexible driving plans', style: 'small'} , $scope.get('form[9].t34f'),$scope.getYes('form[9].t34'),$scope.getNo('form[9].t34')],
                    [ {text:'5) implement driving plans to safely negotiate all driving situations', style: 'small'} , $scope.get('form[9].t35f'),$scope.getYes('form[9].t35'),$scope.getNo('form[9].t35')],
                    [ {text:'C) Making progress whilst showing restraint\n1) accurately judge the speed of your own and other vehicles relative to your proposed actions and the circumstances', style: 'small'} , $scope.get('form[9].t36f'),$scope.getYes('form[9].t36'),$scope.getNo('form[9].t36')],
                    [ {text:'2) make progress whilst maintaining the need for restraint and safety', style: 'small'} , $scope.get('form[9].t37f'),$scope.getYes('form[9].t37'),$scope.getNo('form[9].t37')],
                    [ {text:'D) Controlling the vehicle\n1) control the vehicle safely and smoothly through use of the accelerator', style: 'small'} , $scope.get('form[9].t38f'),$scope.getYes('form[9].t38'),$scope.getNo('form[9].t38')],
                    [ {text:'2) control the vehicle safely and smoothly by applying the required amount of braking at the correct time', style: 'small'} , $scope.get('form[9].t39f'),$scope.getYes('form[9].t39'),$scope.getNo('form[9].t39')],
                    [ {text:'3) when driving manual vehicle select the correct gear for the circumstances by smooth use of the gears and clutch', style: 'small'} , $scope.get('form[9].t310f'),$scope.getYes('form[9].t310'),$scope.getNo('form[9].t310')],
                    [ {text:'4) steer the vehicle accurately, adapting steering techniques as necessary when manoeuvring', style: 'small'} , $scope.get('form[9].t311f'),$scope.getYes('form[9].t311'),$scope.getNo('form[9].t311')],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',colSpan:2},'',$scope.getYesText('form[9].t312'),$scope.getNoText('form[9].t312')],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[9].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[9].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'Record of assessment',alignment:'center',pageBreak: 'before'},
           {text:'ERDT ELEMENT 1.2b Driving the vehicle at high speed (continued)',alignment:'center'},
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*' ,'*', '*', '*'  ],
                body: [
                  [ 'NAME:',$scope.get('form[10].name'), 'NUMBER:',$scope.get('form[10].number'), 'DATE:',{text:$scope.get('form[10].date')} ],
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto','*' , 'auto','auto' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'}, {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'' ],
                  [ '','',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'}],
                  [ {text:'E) Positioning\n1) position the vehicle correctly when following and overtaking other vehicles', style: 'small'} , $scope.get('form[11].t41f'),$scope.getYes('form[11].t41'),$scope.getNo('form[11].t41')],
                  [ {text:'2) position the vehicle correctly when negotiating corners and bend', style: 'small'} , $scope.get('form[11].t42f'),$scope.getYes('form[11].t42'),$scope.getNo('form[11].t42')],
                    [ {text:'3) position the vehicle to obtain the best view with regard to safety', style: 'small'} , $scope.get('form[11].t43f'),$scope.getYes('form[11].t43'),$scope.getNo('form[11].t43')],
                    [ {text:'4) adopt the safest road position at all times in relation to existing road and traffic positions', style: 'small'} , $scope.get('form[11].t44f'),$scope.getYes('form[11].t44'),$scope.getNo('form[11].t44')],
                    [ {text:'F) Cornering\n1) assess corners and bends correctly and accurately', style: 'small'} , $scope.get('form[11].t45f'),$scope.getYes('form[11].t45'),$scope.getNo('form[11].t45')],
                    [ {text:'2) negotiate corners and bends taking account of all relevant factors', style: 'small'} , $scope.get('form[11].t46f'),$scope.getYes('form[11].t46'),$scope.getNo('form[11].t46')],
                    [ {text:'G) Making and interpreting signals\n1) Make appropriate signals to other road users using: indicators, lights, audible, hand signals.', style: 'small'} , $scope.get('form[11].t47f'),$scope.getYes('form[11].t47'),$scope.getNo('form[11].t47')],
                    [ {text:'2) correctly interpret and act on signals from other road users', style: 'small'} , $scope.get('form[11].t48f'),$scope.getYes('form[11].t48'),$scope.getNo('form[11].t48')],
                    [ {text:'H) Overtaking\n1) identify, plan and execute all overtaking manoeuvres safely when passing stationary and moving objects', style: 'small'} , $scope.get('form[11].t49f'),$scope.getYes('form[11].t49'),$scope.getNo('form[11].t49')],
                    [ {text:'2) apply the correct degree of restraint at all times', style: 'small'} , $scope.get('form[11].t410f'),$scope.getYes('form[11].t410'),$scope.getNo('form[11].t410')],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',colSpan:2},'',$scope.getYesText('form[11].t411'),$scope.getNoText('form[11].t411')],
                ]
              }
            },
               {
                  table: {
                    headerRows: 1,
                    widths: [ 'auto', '*', 'auto','*' ],
                    body: [
                      [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[11].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[11].candidateSign'),width: 70} ]
                    ]
                  },
                   layout: {
                       hLineWidth: function(i, node) {
                            return (i === 0 ) ? 0 : 1;
                        }
                   }
                },
           {text:'ERDT ELEMENT 1.3 Drive vehicles at high speed on motorway and multi-lane carriageways',alignment:'center',pageBreak: 'before'},
           '\n',
           {
              table: {
                headerRows: 1,
                pageBreak: 'before',
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ 'NAME:',$scope.get('form[12].name'), 'NUMBER:',$scope.get('form[12].number'), 'INSTRUCTOR',{text:$scope.get('form[12].instructor'),colSpan:3},'','' ],
                  [ 'VEHICLE:',$scope.get('form[12].vehicle'), 'DATE:',$scope.get('form[12].date'), 'DAY:',$scope.get('form[12].day0'),'OF:',$scope.get('form[12].day1')]
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:2},'',{text:'Multi Lane'},$scope.getYes('form[13].multilane'), {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[13].speed0'),
                     {text:'Day', style: 'small'} ,$scope.getYes('form[13].location0'),
                      {text:'Urban', style: 'small'} ,$scope.getYes('form[13].urban'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[13].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[13].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[13].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[13].speed1'),
                      {text:'Night', style: 'small'} ,$scope.getYes('form[13].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[13].rural'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[13].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[13].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[13].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto','*' , 'auto','auto' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'}, {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'' ],
                  [ '','',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'}],
                  [ {text:'1) Follow the correct procedure for joining motorway / multi carriageway road', style: 'small'} , $scope.get('form[14].t51f'),$scope.getYes('form[14].t51'),$scope.getNo('form[14].t51')],
                  [ {text:'2) Adopt the correct lane or position for existing road and traffic conditions', style: 'small'} , $scope.get('form[14].t52f'),$scope.getYes('form[14].t52'),$scope.getNo('form[14].t52')],
                    [ {text:'3)  adjust speed appropriately for type of road and traffic conditions', style: 'small'} , $scope.get('form[14].t53f'),$scope.getYes('form[14].t53'),$scope.getNo('form[14].t53')],
                    [ {text:'4) follow the correct procedure for exiting the motorway / multi carriageway road', style: 'small'} , $scope.get('form[14].t54f'),$scope.getYes('form[14].t54'),$scope.getNo('form[14].t54')],
                    [ {text:'5) understand the relevant sections of the highway code, including the meaning of all road signs, matrix signals, marker boards and cats eyes', style: 'small'} , $scope.get('form[14].t55f'),$scope.getYes('form[14].t55'),$scope.getNo('form[14].t55')],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',colSpan:2},'',$scope.getYesText('form[14].t56'),$scope.getNoText('form[14].t56')],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[14].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[14].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'ERDT ELEMENT 1.4 Undertake an emergency response drive',alignment:'center',pageBreak: 'before'},
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*','*' ,'*', 'auto', 'auto','auto'  ],
                body: [
                  [ 'NAME:',$scope.get('form[15].name'), 'NUMBER:',$scope.get('form[15].number'), 'INSTRUCTOR',{text:$scope.get('form[15].instructor'),colSpan:3},'','' ],
                  [ 'VEHICLE:',$scope.get('form[15].vehicle'), 'DATE:',$scope.get('form[15].date'), 'DAY:',$scope.get('form[15].day0'),'OF:',$scope.get('form[15].day1')]
                ]
              }
            },
           '\n',
           {
              table: {
                headerRows: 1,
                widths: [ 'auto','auto', '*', 'auto','auto','auto', '*', 'auto','*','auto', '*', 'auto' ],
                body: [
                  [ {text:'SPEED',style:'subheader',colSpan:2},'', {text:'LOCATION',style:'subheader',colSpan:2},'',{text:'Multi Lane'},$scope.getYes('form[16].multilane'), {text:'SURFACE',style:'subheader',colSpan:2},'',{text:'TRAFFIC',style:'subheader',colSpan:2},'', {text:'VISIBILITY',style:'subheader',colSpan:2},'' ],
                    [ {text:'In excess of limit', style: 'small'} ,$scope.getYes('form[16].speed0'),
                     {text:'Day', style: 'small'} ,$scope.getYes('form[16].location0'),
                      {text:'Urban', style: 'small'} ,$scope.getYes('form[16].urban'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[16].surface0'),
                      {text:'Low', style: 'small'} ,$scope.getYes('form[16].traffic0'),
                      {text:'Good', style: 'small'} ,$scope.getYes('form[16].visibility0') ],
                    [ {text:'In excess of flow', style: 'small'} ,$scope.getYes('form[16].speed1'),
                      {text:'Night', style: 'small'} ,$scope.getYes('form[16].location1'),
                      {text:'Rural', style: 'small'} ,$scope.getYes('form[16].rural'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[16].surface1'),
                      {text:'High', style: 'small'} ,$scope.getYes('form[16].traffic1'),
                      {text:'Poor', style: 'small'} ,$scope.getYes('form[16].visibility1') ],
                ], 
              }
            },
           '\n',
           {
              table: {
                headerRows: 2,
                widths: [ 'auto','*' , 'auto','auto' ],
                body: [
                  [ {text:'Outcomes of effective\n performance',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'}, {text:'Feedback / Development',rowSpan:2,fillColor: '#ffa07a', style: 'subheader'},{text:'Achieved',colSpan:2,fillColor: '#ffa07a'},'' ],
                  [ '','',{text:'Yes',fillColor: '#ffa07a'},{text:'No',fillColor: '#ffa07a'}],
                  [ {text:'1) Ensure that an emergency response is justifiable and should be maintained', style: 'small'} , $scope.get('form[17].t61f'),$scope.getYes('form[17].t61'),$scope.getNo('form[17].t61')
],
                  [ {text:'2) Ensure that there is justification for taking advantage of your speed exemptions', style: 'small'} , $scope.get('form[17].t62f'),$scope.getYes('form[17].t62'),$scope.getNo('form[17].t62')],
                    [ {text:'3)  make effective use of emergency warning equipment, when appropriate', style: 'small'} , $scope.get('form[17].t63f'),$scope.getYes('form[17].t63'),$scope.getNo('form[17].t63')],
                    [ {text:'4)  Anticipate and respond to the action of other road users when emergency warning equipment is used', style: 'small'} , $scope.get('form[17].t64f'),$scope.getYes('form[17].t64'),$scope.getNo('form[17].t64')],
                    [ {text:'5) make safe and appropriate progress', style: 'small'} , $scope.get('form[17].t65f'),$scope.getYes('form[17].t65'),$scope.getNo('form[17].t65')],
                    [ {text:'6) maintain clear communication with others as required', style: 'small'} , $scope.get('form[17].t66f'),$scope.getYes('form[17].t66'),$scope.getNo('form[17].t66')],
                    [ {text:'7) maintain duty of care whilst using legal exemptions', style: 'small'} , $scope.get('form[17].t67f'),$scope.getYes('form[17].t67'),$scope.getNo('form[17].t67')],
                    [ {text:'8) ensure all actions are consistent with legal requirements and organisational policies', style: 'small'} , $scope.get('form[17].t68f'),$scope.getYes('form[17].t68'),$scope.getNo('form[17].t68')],
                    [ {text:'COMPETENCY ACHIEVED',bold:true,fillColor: '#ffa07a',colSpan:2},'',$scope.getYesText('form[17].t69'),$scope.getNoText('form[17].t69')],
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*' ],
                body: [
                  [ {text:'INSTRUCTOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[17].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[17].candidateSign'),width: 70} ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
           {text:'Response Driving Assessment Report', alignment:'center',pageBreak: 'before'},
           {
              table: {
                headerRows: 2,
                widths: [ 'auto', '*', 'auto','*' ,'auto', '*'  ],
                body: [
                  [ 'NAME.',$scope.get('form[18].name'), 'Role.',$scope.get('form[18].role'), 'HRMS No.',{text:$scope.get('form[18].role')} ],
                  [ 'Vehicle Type.',$scope.get('form[18].vehicle'), 'Reg No.',$scope.get('form[18].regno'), 'Date.',$scope.get('form[18].date')]
                ]
              }
            },
           {text:'\n'},
           {
              table: {
                headerRows: 1,
                widths: [ '*', 'auto','*', 'auto'  ],
                body: [
                  [ {text:'1. VEHICLE SAFETY CHECKS',fillColor: '#ffa07a'},$scope.getYes('form[19].vehicleSafetyCheck'), {text:'2. COCKPIT SAFETY CHECKS',fillColor: '#ffa07a'},$scope.getYes('form[19].cockpitSafetyCheck')]
                ]
              }
            },
           {text:'\n'},
           {
              table: {
                headerRows: 1,
                widths: [ '*', 'auto','auto','auto','*', 'auto','auto','auto'  ],
                body: [
                  [ {text:'3. CONTROL',fillColor: '#ffa07a'},'T','S','D', {text:'8. USE OF SPEED',fillColor: '#ffa07a'},'T','S','D'],
                    [ 'ACCELERATOR',$scope.getTotal('form[19].c3accelerator'), $scope.get('form[19].c3acceleratorS'),$scope.get('form[19].c3acceleratorD'), 'PROGRESS',$scope.getTotal('form[19].c8progress'),$scope.get('form[19].c8progressS'),$scope.get('form[19].c8progressD')],
                    [ 'GEARS',$scope.getTotal('form[19].c3gears'),$scope.get('form[19].c3gearsS'),$scope.get('form[19].c3gearsD'), 'UNDUE HESITATION',$scope.getTotal('form[19].c8undueHesitation'),$scope.get('form[19].c8undueHesitationS'),$scope.get('form[19].c8undueHesitationD')],
                    [ 'FOOTBRAKE',$scope.getTotal('form[19].c3footbrake'),$scope.get('form[19].c3footbrakeS'),$scope.get('form[19].c3footbrakeD'), 'SPEED +', $scope.getTotal('form[19].c8speed'),$scope.get('form[19].c8speedS'),$scope.get('form[19].c8speedD')],
                    [ 'HANDBRAKE',$scope.getTotal('form[19].c3handbrake'),$scope.get('form[19].c3handbrakeS'),$scope.get('form[19].c3handbrakeD'), {text:'',colSpan:4},'','',''],
                    [ 'CLUTCH',$scope.getTotal('form[19].c3clutch'),$scope.get('form[19].c3clutchS'),$scope.get('form[19].c3clutchD'), {text:'9. SIGNALS',fillColor: '#ffa07a'},{text:'',colSpan:3},'',''],
                    [ 'STEERING',$scope.getTotal('form[19].c3steering'),$scope.get('form[19].c3steeringS'),$scope.get('form[19].c3steeringD'), 'NECESSARY',$scope.getTotal('form[19].c9Necessary'),$scope.get('form[19].c9NecessaryS'),$scope.get('form[19].c9NecessaryD')],
                    [ {text:'',colSpan:4},'','','', 'CORRECT',$scope.getTotal('form[19].c9correct'),$scope.get('form[19].c9correctS'),$scope.get('form[19].c9correctD')],
                    [ {text:'4. RESPONSE TO SIGNS AND SIGNALS',fillColor: '#ffa07a'},{text:'',colSpan:3},'','', 'TIMED',$scope.getTotal('form[19].c9timed'),$scope.get('form[19].c9timedS'),$scope.get('form[19].c9timedD')],
                    [ 'TRAFFIC SIGNS',$scope.getTotal('form[19].c4trafficSign'),$scope.get('form[19].c4trafficSignS'),$scope.get('form[19].c4trafficSignD'), 'AUDIBLE WARNINGS',$scope.getTotal('form[19].c9audibleWarning'),$scope.get('form[19].c9audibleWarningS'),$scope.get('form[19].c9audibleWarningD')],
                    [ 'ROAD MARKINGS',$scope.getTotal('form[19].c4roadMarking'),$scope.get('form[19].c4roadMarkingS'), $scope.get('form[19].c4roadMarkingD'), {text:'',colSpan:4},'','',''],
                    [ 'RED TRAFFIC LIGHTS',$scope.getTotal('form[19].c4redTrafficLight'),$scope.get('form[19].c4redTrafficLightS'), $scope.get('form[19].c4redTrafficLightD'), {text:'10. POSITIONING',fillColor: '#ffa07a'},{text:'',colSpan:3},'',''],
                    [ 'OTHER ROAD USERS',$scope.getTotal('form[19].c4otherRoadUser'),$scope.get('form[19].c4otherRoadUserS'), $scope.get('form[19].c4otherRoadUserD'), 'RESPONSE DRIVING',$scope.getTotal('form[19].c10responseDriving'),$scope.get('form[19].c10responseDrivingS'), $scope.get('form[19].c10responseDrivingD')],
                    [ 'PEDESTRIAN CROSSINGS',$scope.getTotal('form[19].c4pedestrianCrossing'),$scope.get('form[19].c4pedestrianCrossingS'), $scope.get('form[19].c4pedestrianCrossingD'), 'CLEARANCE OF OBSTACLES',$scope.getTotal('form[19].c10clearanceOfObstacle'),$scope.get('form[19].c10clearanceOfObstacleS'), $scope.get('form[19].c10clearanceOfObstacleD')],
                    [ {text:'5. JUDGEMENT WHEN',fillColor: '#ffa07a'},{text:'',colSpan:3},'','', {text:'',colSpan:4},'','',''],
                    [ 'OVERTAKING',$scope.getTotal('form[19].c5overtaking'),$scope.get('form[19].c5overtakingS'), $scope.get('form[19].c5overtakingD'), {text:'11. AWARENESS AND PLANNING',fillColor: '#ffa07a'},{text:'',colSpan:3},'',''],
                    [ 'MEETING',$scope.getTotal('form[19].c5meeting'),$scope.get('form[19].c5meetingS'), $scope.get('form[19].c5meetingD'), '',$scope.getTotal('form[19].c11awarenessAndPlanning'),$scope.get('form[19].c11awarenessAndPlanningS'), $scope.get('form[19].c11awarenessAndPlanningD')],
                    [ 'CROSSING',$scope.getTotal('form[19].c5crossing'),$scope.get('form[19].c5crossingS'), $scope.get('form[19].c5crossingD'), {text:'',colSpan:4},'','',''],
                    [ {text:'',colSpan:4},'','','', {text:'12. ATTITUDE',fillColor: '#ffa07a'},{text:'',colSpan:3},'',''],
                    [ {text:'6. JUNCTIONS AND ROUNDABOUTS',fillColor: '#ffa07a'},{text:'',colSpan:3},'','', 'DRIVER BEHAVIOUR',$scope.getTotal('form[19].c12driverBehaviour'),$scope.get('form[19].c12driverBehaviourS'), $scope.get('form[19].c12driverBehaviourD')],
                    [ 'APPROACH SPEED',$scope.getTotal('form[19].c6approachSpeed'),$scope.get('form[19].c6approachSpeedS'), $scope.get('form[19].c6approachSpeedD'), 'COURTESY TO PUBLIC',$scope.getTotal('form[19].c12courtesyOfPublic'),$scope.get('form[19].c12courtesyOfPublicS'), $scope.get('form[19].c12courtesyOfPublicD')],
                    [ 'OBSERVATION',$scope.getTotal('form[19].c6observation'),$scope.get('form[19].c6observationS'), $scope.get('form[19].c6observationD'), {text:'',colSpan:4},'','',''],
                    [ 'POSITION',$scope.getTotal('form[19].c6position'),$scope.get('form[19].c6positionS'), $scope.get('form[19].c6positionD'), {text:'13. SYSTEM OF VEHICLE CONTROL',fillColor: '#ffa07a'},{text:'',colSpan:3},'',''],
                    [ {text:'',colSpan:4},'','','', '',$scope.getTotal('form[19].c13systemOfVehicle'),$scope.get('form[19].c13systemOfVehicleS'), $scope.get('form[19].c13systemOfVehicleD')],
                    [ {text:'7. USE OF MIRRORS',fillColor: '#ffa07a'},{text:'',colSpan:3},'','', {text:'ASSESSOR TOOK ACTION',colSpan:2},'',$scope.getYes('form[19].assesorTookActionV'), $scope.getYes('form[19].assesorTookActionP')],
                    [ 'SIGNALLING',$scope.getTotal('form[19].c6signaling'),$scope.get('form[19].c6signalingS'), $scope.get('form[19].c6signalingS'), ' TOTAL DRIVING FAULTS','','',''],
                    [ 'CHANGE OF DIRECTION',$scope.getTotal('form[19].c7changeOfDirection'),$scope.get('form[19].c7changeOfDirectionS'), $scope.get('form[19].c7changeOfDirectionD'), {text:'COMPETENT',colSpan:3},'','', $scope.getYesText('form[19].competent')],
                    [ 'CHANGE OF     SPEED',$scope.getTotal('form[19].c7changeOfSpeed'), $scope.get('form[19].c7changeOfSpeedS'), $scope.get('form[19].c7changeOfSpeedD'), {text:' NOT YET COMPETENT',colSpan:3},'','', $scope.getNoText('form[19].competent')],
                    
                ]
              }
            },
           {text:'\n'},
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*','auto', '*','auto', '*'  ],
                body: [
                  [ 'CANDIDATE SIGNATURE',{image:$scope.getImage('form[17].candidateSign'),width: 70}, 'ASSESSOR PRINT NAME',$scope.get('form[19].assesorPrintName'),'ASSESSOR SIGNATURE',{image:$scope.getImage('form[17].assesorSign'),width: 70}]
                ]
              }
            },
           {text:'',pageBreak: 'before'},
           {
              table: {
                headerRows: 1,
                widths: [ '*' ],
                body: [
                  [ {text:'Feedback / Development',style:'subheader',fillColor: '#ffa07a',margin: [5,5,5,5]} ],
                  [ {text:$scope.get('form[20].feedback'),style:'small',rowSpan:10} ],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],
                    [''],[''],[''],['']
                ]
              }
            },
           {
              table: {
                headerRows: 1,
                widths: [ 'auto', '*', 'auto','*', 'auto','*' ],
                body: [
                  [ {text:'ASSESSOR SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[20].instructorSign'),width: 70}, {text:'CANDIDATE SIGN:',style:'subheader',margin: [2,2,2,2]},{image:$scope.getImage('form[20].candidateSign'),width: 70},
                   {text:'DATE',style:'subheader',margin: [2,2,2,2]},
                   {text: $scope.get('form[20].date'),margin: [2,2,2,2]}
                  ],
                ]
              },
               layout: {
                   hLineWidth: function(i, node) {
				        return (i === 0 ) ? 0 : 1;
				    }
               }
            },
       ],
        images:{ tick:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAUABYDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEFAgQGB//EACcQAAEDBAEEAAcAAAAAAAAAAAECAwQABQYRIRITMUEHNUJRcYGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD3V65QY82PCemx25cnq7DC3Uhx3pG1dKd7VocnVcfdL7LyPI3sVsD7kduN82ujR5YB8MtHx3T7P0gH34x+I+EyMlt0ebZktR8ihPtuRZmwhQAVykq1vpHUVa+48ejdYXizeI44xbUr70gkuy5Ht95XKln+fgCkOLWBbY1shNQobKGo7Q0hA5/ZJ5JPkk8kkk0rdpTUxHulKVItTSlKo//Z'
               },
       styles: {
         header: {
           fontSize: 18,
           bold: true,
           alignment:'center' 
         },
           subheader: {
           fontSize: 14,
           bold: true,
           alignment:'center' 
         },
         anotherStyle: {
           italic: true,
           alignment: 'right'
         },
        small: {
            fontSize:10,
        },
         paragraph:{
            fontSize:10,
         }  
       }
    };
}
//        // then you create a PdfPrinter object
//      pdfMake.createPdf(docDefinition).open();
      pdfMake.createPdf(docDefinition).getBuffer(function(buffer) {
         var binary=buffer;
            console.log("file system...");
          document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
               console.log(fileSystem.name);
               console.log(fileSystem.root.name);
               console.log(fileSystem.root.fullPath);
               fileSystem.root.getFile($scope.getName(index), {create: true}, function(entry) {
                  var fileEntry = entry;
                  console.log(entry);
                  entry.createWriter(function(writer) {
                     writer.onwrite = function(evt) {
                     console.log("write success");
                        $scope.notification.status = true; 
                        $scope.notification.message = 'Document Saved to file system';
                        $scope.notification.type = 'alert-success';
                        $timeout(function() {
                            $scope.notification.status = false;
                        }, 2000); // delay 2000 ms
                  };
                  console.log("writing to file");
                     writer.write( binary.toArrayBuffer() );
                  }, function(error) {
                     console.log(error);
                      $scope.notification.status = true; 
                      $scope.notification.message = 'Unable to save Document.';
                        $scope.notification.type = 'alert-danger';
                        $timeout(function() {
                            $scope.notification.status = false;
                        }, 2000); // delay 2000 ms
                  });

               }, function(error){
                  console.log(error);
               });
            },
            function(event){
             console.log( evt.target.error.code );
            });
            }
        });
                    
                }
              });
    }
     $scope.getName= function(index){
         console.log(TodosService.form[index]);
         return TodosService.form[index][0].name+'-'+TodosService.todos[index].title+'.pdf';
     }
    $scope.get= function(item)
      {
        if(item.substring(0, 8)=='form[19]' )
        {    
            val = $scope.$eval(item)
            str = '';
            for (i=0; i< val; i++)
                str += '/';
            return str;
        }
        console.log(item + $scope.$eval(item))
        return '' + $scope.$eval(item);
      }
    $scope.getTotal= function(item)
      {
        str=item+'T';
        console.log('total : '+$scope.$eval(str));
        val = $scope.$eval(str)
        str = '';
        for (i=0; i< val; i++)
            str += '/';
        return str;
      }
    $scope.getImage= function(item)
    {
        if($scope.$eval(item)!=null && $scope.$eval(item) != "")
            return $scope.$eval(item);   
        else{
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC'
        }
    }
    $scope.getYes= function(item)
      {
        if ($scope.index == 5){
            if(($scope.$eval(item)=='yes' || $scope.$eval(item) == true) && item!= 'form[1].KU')
                return {text: '/',width:12,alignment:'center'}
            else if(($scope.$eval(item)=='yes' || $scope.$eval(item) == true) && item== 'form[1].KU')
                return {text: '/',width:12,alignment:'center'}
            else
                return '';
        }
        
        if(($scope.$eval(item)=='yes' || $scope.$eval(item) == true) && item!= 'form[1].KU')
//            return {text: '/',width:12,alignment:'center'}
            return {image:'tick',width:12,alignment:'center'}
        else if(($scope.$eval(item)=='yes' || $scope.$eval(item) == true) && item== 'form[1].KU')
            return {image: 'tick',width:12,alignment:'center'}
        else
            return '';
      }
    $scope.getYesText= function(item)
    {
        if(($scope.$eval(item)=='yes' || $scope.$eval(item) == true) && item!= 'form[1].KU')
            return {text: 'YES',alignment:'center'}
        else
            return '';
    }
    $scope.getNoText= function(item)
    {
        if($scope.$eval(item)=='yes' || $scope.$eval(item) == true)
            return '';
        else
            return {text: 'NO',alignment:'center'}
    }
    $scope.getNo= function(item)
      {
        console.log($scope.$eval(item) + ' : ' + item )
        if($scope.$eval(item)=='yes' || $scope.$eval(item)=='' || $scope.$eval(item) == false)
            return '';
        else if($scope.index == 5)
            return {text: '/',width:12,alignment:'center'}
        else
            return {image: 'tick',width:12,alignment:'center'}
//        if($scope.index == 5)
//            if($scope.$eval(item)=='no' || $scope.$eval(item) == false)
//                return {text: '/',width:12,alignment:'center'}
//        else if($scope.$eval(item)=='no' || $scope.$eval(item) == false)
//            return {image: 'tick',width:12,alignment:'center'}
//        else
//            return '';
      }
})