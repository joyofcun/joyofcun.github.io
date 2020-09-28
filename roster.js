function populateData()
{
    var 
    a=[],
    b=new Course("I310B IA",2,"A017",[],IA_RESTRICTION),
    c=new Course("I303A Inter-Intranet",2,"B11",[]),
    d=new Course("I303B Labo r&eacute;seaux",2,"A017",[2,3,6,7,10,11,13],SERIE1),
    e=new Course("I302B Adm Unix (ex)",2,"A019",[2,3,6,7,10,11,13],SERIE2),
    f=new Course("I312A SAP",2,"A017",[],SAP_RESTRICTION),
    g=new Course("I301B DAE (th)",1,"B23",[3,4,5,6]),
    h=new Course("I301A Pattern",2,"A017",[],SERIE1),
    i=new Course("I301B DAE (ex)",2,"A019",[],SERIE2),
    j=new Course("I305A Anglais 3",2,"B23",[],SERIE2),
    k=new Course("I302A Adm Unix (th)",2,"AudB",[]),
    l=new Course("I304A Big Data",2,"B11",[]),
    m=new Course("I302C Windows",2,"A019",[],SERIE2),
    n=new Course("I312B SAP",2,"A017",[],SAP_RESTRICTION),
    o=new Course("I313A REST services",2,"A017",[],WEB_RESTRICTION),
    p=new Course("I313B Web Cloud",2,"A017",[],WEB_RESTRICTION),
    q=new Course("I304C Droit d&eacute;onto",2,"B11",[6]),
    r=new Course("I311A Outils MIC",2,"A017",[],MICROSOFT_RESTRICTION),
    s=new Course("I311B Outils MIC",2,"A017",[],MICROSOFT_RESTRICTION),
    t=new Course("I314A Unity",4,"A017",[],UNITY_RESTRICTION),
    u=new Course("I304B Projets Agile",2,"B12",[1,2,7,8,9,10,11,12,13]),
    v=new Course("IXYZ Gestion (cr&eacute;ation entreprise)",2,"D2",[8,9,10,11,12,13],GESTION_ENT_RESTRICTION),
    w=cloneObject(m);
    w.physicLocation="A017",
    w.restriction=SERIE1;
   
    var x=cloneObject(b);
    x.name="I310A IA";
    
    var y=cloneObject(j);
    y.restriction=SERIE1;
    
    var 
    z=cloneObject(h);
    z.restriction=SERIE2,
    z.physicLocation="A019";
    
    var A=cloneObject(i);
    A.restriction=SERIE1,A.physicLocation="A019";
    
    var B=cloneObject(g);
    B.weeksExceptions=[1,2,7,8,9,10,11,12,13];
    
    var C=cloneObject(e);
    C.restriction=SERIE1,
    C.weeksExceptions=[1,4,5,8,9,12,13];
    
    var D=cloneObject(d);
    D.restriction=SERIE2,
    D.weeksExceptions=[1,4,5,8,9,12,13];
    
    var 
    E={hour_08_30:[b],hour_10_45:[c],hour_13_45:[d,D,e,C],hour_17_00:[f]},
    F={hour_08_00:[u],hour_09_30:[g],hour_10_00:[B],hour_10_45:[h,i],hour_13_45:[A,j],hour_17_00:[k]},
    G={hour_08_30:[x,y],hour_10_45:[l],hour_13_45:[z],hour_16_00:[m],hour_17_00:[n]},
    H={hour_08_30:[o],hour_10_45:[p],hour_13_45:[q],hour_16_00:[w]},I={hour_08_30:[r],hour_10_45:[s],hour_13_15:[t],hour_16_00:[v]};
    return 
    a.push(E),
    a.push(F),
    a.push(G),
    a.push(H),
    a.push(I),
    a
}
    function 
    Course(a,b,c,d,e)
    {
        this.name=a,
        this.duration=b,
        this.physicLocation=c,
        this.weeksExceptions=d,
        void 0===e?
        this.restriction="":this.restriction=e
    }
    
    function 
    cloneObject(a)
    {
        return jQuery.extend(!0,{},a)
    }
    
    function 
    findAccessibleCourse(a,b,c)
    {
        var d;
        return $.each(a,function(a,e)
        {
            if((""===e.restriction||jQuery.inArray(e.restriction,b)!==-1)&&jQuery.inArray(c,e.weeksExceptions)===-1)
            return d=e,!1
        }
        ),d
    }
    
    function 
    graphicalTimeFix(a,b)
    {
        return jQuery.inArray(b,["08_00","08_30","09_30","13_15"])!=-1?a.duration+2:jQuery.inArray(b,["17_00","16_00"])!=-1?a.duration+3:a.duration
    }
    
    function 
    CreateTimeTable(a,b,c)
    {
        $(".Timetable__room").parent("tr:not(.Timetable__time)").find("td").remove();var d=["08_00","08_30","09_30","10_00","10_30","10_45","12_45","13_15","13_45","15_45","16_00","17_00","17_15","18_00","18_30","19_00"],e="hour_";
        $.each(b,function(b,f)
        {
            for(var g=0;g<d.length;g++)
            {
                if(g>d.length)return!1;
                var h='<td colspan="1"></td>',
                i=e.concat(d[g]);
                if(f.hasOwnProperty(i))
                {
                    var j=findAccessibleCourse(f[i],a,c);
                    if(void 0!=j)
                    {
                        var k=graphicalTimeFix(j,d[g]);
                        h='<td colspan="'+k+'"> <div class="Allocation"><span class="Allocation__title">'+j.name+'</span><span class="Allocation__tutor">'+j.physicLocation+"</span> </div> </td>",g=g+k-1
                    }
                }
                $(".Timetable__room").parent("tr:not(.Timetable__time)").eq(b).append(h)
            }
        }
        )
    }
    const 
    IA_RESTRICTION="IA",
    MICROSOFT_RESTRICTION="MIC",
    UNITY_RESTRICTION="UN",
    SAP_RESTRICTION="SAP",
    WEB_RESTRICTION="WEB",
    GESTION_ENT_RESTRICTION="GESTION_ENT",
    SERIE1="I1",SERIE2="I2";
    $(function()
    {
        var 
        a=populateData(),
        b=1,
        c=[];
        $(":checkbox").on("change",function()
        {
            c=[],$.each($(":checkbox:checked"),
            function(a,b){c.push($(this).val())}),
            CreateTimeTable(c,a,b)}),
            $(':radio[name="semaine"]').on("click",
            function()
            {
                b=parseInt($(':radio[name="semaine"]:checked').val()),
                CreateTimeTable(c,a,b)
            }
            )
    }
    );
