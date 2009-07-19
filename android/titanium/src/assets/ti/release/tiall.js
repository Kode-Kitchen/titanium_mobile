
var Titanium=new function(){this.platform='android';this.version='TI_VERSION';this.window=window;this.document=document;this.apiProxy=window.TitaniumAPI;this.rethrow=function(e){throw e;};this.doPostProcessing=function(){var imgs=document.getElementsByTagName('img');for(i=0;i<imgs.length;i++){var s=imgs[i].src;if(s.indexOf('file:///')==0){if(s.indexOf('file:///sdcard/')==-1&&s.indexOf('file:///android_asset')==-1){imgs[i].src=s.substring(8);}}else if(s.indexOf('app://')==0){imgs[i].src=s.substring(6);}}};this.getPosition=function(obj){var pos={top:0,left:0,width:0,height:0};pos.width=obj.offsetWidth;pos.height=obj.offsetHeight;while(obj){pos.left+=obj.offsetLeft;pos.top+=obj.offsetTop;obj=obj.offsetParent;}
return pos;};this.sendLayoutToNative=function(ids){var positions={};for(i=0;i<ids.length;i++){var id=ids[i];var o=document.getElementById(id);positions[id]=this.getPosition(o);}
this.apiProxy.updateNativeControls(Titanium.JSON.stringify(positions));}
this.callbackCounter=0;this.callbacks=new Object();this.nextCallbackId=function(){return'cb'+this.callbackCounter++;}
this.addCallback=function(o,f,os){var cb=new TitaniumCallback(o,f,os);return(new TitaniumCallback(o,f,os)).register();}
this.removeCallback=function(name){delete this.callbacks[name];Titanium.API.debug('Deleted callback with name: '+name);}};function TitaniumCallback(obj,method,oneShot){this.name=Titanium.nextCallbackId();this.obj=obj;this.method=method;this.oneShot=oneShot;this.invoke=function(data,syncId)
{this.method.call(this.obj,data);if(!isUndefined(syncId)){Titanium.apiProxy.signal(syncId);}
if(oneShot){Titanium.removeCallback(this.name);}};this.register=function(){Titanium.callbacks[this.name]=this;return'Titanium.callbacks["'+this.name+'"]';}};function registerCallback(o,f){return Titanium.addCallback(o,f,false);};function registerOneShot(o,f){return Titanium.addCallback(o,f,true);}
function isUndefined(value)
{if(value===null||typeof(value)==='undefined')
{return true;}
return(typeof(value)=='object'&&String(value).length===0);}
function typeOf(value){var s=typeof value;if(s==='object'){if(value){if(value instanceof Array){s='array';}}else{s='null';}}
return s;}
function transformObjectValue(value,def)
{if(isUndefined(value))return def;return value;}
Titanium.API={log:function(severity,msg)
{Titanium.apiProxy.log(severity,msg);},debug:function(msg)
{this.log(this.DEBUG,msg);},error:function(msg)
{this.log(this.ERROR,msg);},warn:function(msg)
{this.log(this.WARN,msg);},info:function(msg)
{this.log(this.INFO,msg);},trace:function(msg)
{this.log(this.TRACE,msg);},notice:function(msg)
{this.log(this.NOTICE,msg);},critical:function(msg)
{this.log(this.CRITICAL,msg);},fatal:function(msg)
{this.log(this.FATAL,msg);},TRACE:1,DEBUG:2,INFO:3,NOTICE:4,WARN:5,ERROR:6,CRITICAL:7,FATAL:8};Titanium.Process={getEnv:function(){},setEnv:function(){},hasEnv:function(){},launch:function(){}};
if(!this.Titanium.JSON){Titanium.JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof Titanium.JSON.stringify!=='function'){Titanium.JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('Titanium.JSON.stringify');}
return str('',{'':value});};}
if(typeof Titanium.JSON.parse!=='function'){Titanium.JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());
Titanium.appProxy=window.TitaniumApp;Titanium.App={getID:function()
{return transformObjectValue(Titanium.appProxy.getID(),null);},getName:function()
{return transformObjectValue(Titanium.appProxy.getModuleName(),null);},getVersion:function()
{return transformObjectValue(Titanium.appProxy.getVersion(),null);},getPublisher:function()
{return transformObjectValue(Titanium.appProxy.getPublisher(),null);},getURL:function()
{return transformObjectValue(Titanium.appProxy.getURL(),null);},getDescription:function()
{return transformObjectValue(Titanium.appProxy.getDescription(),null);},getCopyright:function()
{return transformObjectValue(Titanium.appProxy.getCopyright(),null);},getGUID:function()
{return transformObjectValue(Titanium.appProxy.getGUID(),null);},appURLToPath:function(url)
{return transformObjectValue(Titanium.appProxy.appURLToPath(url),null);},getStreamURL:function(stream)
{return transformObjectValue(Titanium.appProxy.getStreamURL(stream),null);},triggerLoad:function()
{Titanium.appProxy.triggerLoad();},setLoadOnPageEnd:function(load)
{return transformObjectValue(Titanium.appProxy.setLoadOnPageEnd(load),null);}};Properties=function(proxy){this.proxy=proxy;this.getString=function(name,def){def=arguments.length==1||isUndefined(def)?null:def;var r=this.proxy.getString(name,def);return transformObjectValue(r,def);};this.setString=function(name,value){return this.proxy.setString(name,value);};this.getInt=function(name,def){def=arguments.length==1||isUndefined(def)?-1:def;var r=this.proxy.getInt(name,def);return transformObjectValue(r,def);};this.setInt=function(name,value){return this.proxy.setInt(name,value);};this.getBool=function(name,def){def=arguments.length==1||isUndefined(def)?false:def;var r=this.proxy.getBool(name,def);return transformObjectValue(r,def);};this.setBool=function(name,value){return this.proxy.setBool(name,value);},this.getDouble=function(name,def){def=arguments.length==1||isUndefined(def)?0.0:def;var r=this.proxy.getDouble(name,def);return transformObjectValue(r,def);},this.setDouble=function(name,value){return this.proxy.setDouble(name,value);}};Titanium.App.Properties=new Properties(Titanium.appProxy.getAppProperties());Titanium.App.SystemProperties=new Properties(Titanium.appProxy.getSystemProperties());
Titanium.uiProxy=window.TitaniumUI;var MenuItem=function(){this.obj;this._callback;this.isRoot=function(){return this.obj.isRoot();};this.isSeparator=function(){return this.obj.isSeparator();};this.isItem=function(){return this.obj.isItem();};this.isSubMenu=function(){return this.obj.isSubMenu();};this.isEnabled=function(){return this.obj.isEnabled();};this.addSeparator=function(){var m=new MenuItem;m.obj=this.obj.addSeparator();return m;};this.addItem=function(label,callback,icon){var m=new MenuItem();this._callback=callback;m.obj=this.obj.addItem(label,registerCallback(this,this._callback),icon);return m;};this.addSubMenu=function(label,icon){var m=new MenuItem();m.obj=this.obj.addSubMenu(label,icon);return m;};this.enable=function(){this.obj.enable();};this.disable=function(){this.obj.disable();};this.setLabel=function(label){this.obj.setLabel(label);};this.getLabel=function(){return this.obj.getLabel();};this.setIcon=function(icon){this.obj.setIcon(icon);};this.getIcon=function(){return this.obj.getIcon();};this.setCallback=function(f){_callback=f;this.obj.setCallback(registerCallback(this,f));};};var OptionDialog=function(proxy){this.proxy=proxy;this.setTitle=function(title){this.proxy.setTitle(title);};this.setOptions=function(options){var o=transformObjectValue(options,[]);if(typeOf(o)!=='array'){o=[options];}
this.proxy.setOptions(o);};this.addEventListener=function(eventName,listener){if(eventName!=="click"){throw new Error("OptionDialog only handles click events. Use event name 'click'");}
return this.proxy.addEventListener(eventName,registerCallback(this,listener));};this.removeEventListener=function(eventName,listenerId){if(eventName!=="click"){throw new Error("OptionDialog only handles click events. Use event name 'click'");}
this.proxy.removeEventListener(eventName,listenerId);};this.show=function(){this.proxy.show();};this.setDestructive=function(id){};this.setCancel=function(id){}};var AlertDialog=function(proxy){this.proxy=proxy;this.setTitle=function(title){this.proxy.setTitle(title);};this.setMessage=function(msg){alert("setting msg: "+msg);this.proxy.setMessage(msg);};this.setButtonNames=function(names){var n=transformObjectValue(names,[]);if(typeOf(n)!=='array'){n=[names];}
this.proxy.setButtons(n);};this.addEventListener=function(eventName,listener){if(eventName!=="click"){throw new Error("AlertDialog only handles click events. Use event name 'click'");}
return this.proxy.addEventListener(eventName,registerCallback(this,listener));};this.removeEventListener=function(eventName,listenerId){if(eventName!=="click"){throw new Error("AlertDialog only handles click events. Use event name 'click'");}
this.proxy.removeEventListener(eventName,listenerId);};this.show=function(){this.proxy.show();}};var ActivityIndicator=function(proxy){this.proxy=proxy;this.setMessage=function(msg){this.proxy.setMessage(msg);};this.setMin=function(n){this.proxy.setMin(n);};this.setMax=function(n){this.proxy.setMax(n);};this.setPos=function(n){this.proxy.setPosition(n);};this.show=function(){this.proxy.show();};this.hide=function(){this.proxy.hide();};};var TitaniumNotifier=function(proxy){this.proxy=proxy;this._callback;this.setTitle=function(title){this.proxy.setTitle(title);};this.setMessage=function(message){this.proxy.setMessage(message);};this.setIcon=function(iconUrl){this.proxy.setIcon(iconUrl);};this.setDelay=function(delay){this.proxy.setDelay(delay);};this.setCallback=function(callback){this._callback=callback;this.proxy.setCallback(registerCallback(this,_callback));};this.show=function(animate,autohide){this.proxy.show(transformObjectValue(animate,false),transformObjectValue(autohide,true));};this.hide=function(animate){this.proxy.hide(transformObjectValue(animate,false));}};var TableView=function(proxy){this.proxy=proxy;this._callback;this.setData=function(data){this.proxy.setData(data);};this.setRowHeight=function(height){this.proxy.setRowHeight(height);};this.setIsPrimary=function(primary){this.proxy.setIsRoot(primary);};this.open=function(options){var opt=null;if(!isUndefined(options)){opt=Titanium.JSON.stringify(options);}
this.proxy.open(opt,registerCallback(this,this._callback));};this.close=function(){this.proxy.close();}};var UserWindow=function(proxy){this.proxy=proxy;this._window;this.setWindowId=function(name){this.proxy.setWindowId(name);}
this.setURL=function(url){this.proxy.setUrl(url);};this.setTitle=function(title){this.proxy.setTitle(title);};this.setTitleImage=function(imageUrl){this.proxy.setTitleImage(imageUrl);};this.setFullscreen=function(fullscreen){this.proxy.setFullscreen(fullscreen);};this.setType=function(type){this.proxy.setType(type);}
this.open=function(options){this._window=this.proxy.open();return this._window;};this.close=function(options){this.proxy.close();this._window=null;};this.addEventListener=function(eventName,listener){return this.proxy.addEventListener(eventName,registerCallback(this,listener));};this.removeEventListener=function(eventName,listenerId){this.proxy.removeEventListener(eventName,listenerId);};this.setNavBarColor=function(color){};this.setLeftNavButton=function(button){};this.setRightNavButton=function(button){};this.showNavBar=function(options){};this.hideNavBar=function(options){}
this.setBarColor=function(options){}};UserWindow.prototype.__defineGetter__("window",function(){return this._window;});var Button=function(proxy){this.proxy=proxy;this.addEventListener=function(eventName,listener){return this.proxy.addEventListener(eventName,registerCallback(this,listener));};this.removeEventListener=function(eventname,listenerId){this.proxy.removeEventListener(eventName,listenerId);};this.open=function(options){this.proxy.open(options);};};var Switch=function(proxy){this.proxy=proxy;this.addEventListener=function(eventName,listener){return this.proxy.addEventListener(eventName,registerCallback(this,listener));};this.removeEventListener=function(eventname,listenerId){this.proxy.removeEventListener(eventName,listenerId);};this.open=function(options){this.proxy.open(options);};};var Slider=function(proxy){this.proxy=proxy;this.addEventListener=function(eventName,listener){return this.proxy.addEventListener(eventName,registerCallback(this,listener));};this.removeEventListener=function(eventname,listenerId){this.proxy.removeEventListener(eventName,listenerId);};this.open=function(options){this.proxy.open(options);};};var TextArea=function(proxy){this.proxy=proxy;this.addEventListener=function(eventName,listener){return this.proxy.addEventListener(eventName,registerCallback(this,listener));};this.removeEventListener=function(eventname,listenerId){this.proxy.removeEventListener(eventName,listenerId);};this.open=function(options){this.proxy.open(options);};};var TextField=function(proxy){this.proxy=proxy;this.addEventListener=function(eventName,listener){return this.proxy.addEventListener(eventName,registerCallback(this,listener));};this.removeEventListener=function(eventname,listenerId){this.proxy.removeEventListener(eventName,listenerId);};this.open=function(options){this.proxy.open(options);};};Titanium.UI={WINDOW_TABBED:'tabbed',WINDOW_NORMAL:'single',createWindow:function(options){var w=new UserWindow(Titanium.uiProxy.createWindow());if(!isUndefined(options)){var url=options['url'];var fullscreen=options['fullscreen'];var type=options['type'];var title=options['title'];var titleImage=options['titleImage'];if(!isUndefined(url)){w.setURL(url);}
if(!isUndefined(fullscreen)){w.setFullscreen(fullscreen);}
if(!isUndefined(type)){w.setType(type);}
if(!isUndefined(title)){w.setTitle(title);}
if(!isUndefined(titleImage)){w.setTitleImage(titleImage);}}
return w;},createMenu:function(){var m=new MenuItem;m.obj=Titanium.uiProxy.createMenu();return m;},createTrayMenu:function(){},setMenu:function(m){Titanium.uiProxy.setMenu(m.obj);},getMenu:function(){Titanium.uiProxy.getMenu();},setContextMenu:function(){},getContextMenu:function(){},setIcon:function(){},windows:function(){},createAlertDialog:function(options){var dlg=new AlertDialog(Titanium.uiProxy.createAlertDialog());if(!isUndefined(options)){title=options['title'];message=options['message'];buttonNames=options['buttonNames'];if(!isUndefined(title)){dlg.setTitle(title);}
if(!isUndefined(message)){dlg.setMessage(message);}
if(!isUndefined(buttonNames)){dlg.setButtonNames(buttonNames);}}
return dlg;},createOptionDialog:function(options){var dlg=new OptionDialog(Titanium.uiProxy.createOptionDialog());if(!isUndefined(options)){title=options['title'];optionValues=options['options'];if(!isUndefined(title)){dlg.setTitle(title);}
if(!isUndefined(buttonNames)){dlg.setOptions(optionValues);}}
return dlg;},createActivityIndicator:function(options){var ind=new ActivityIndicator(Titanium.uiProxy.createProgressDialog());ind.setLocation(1);if(!isUndefined(options)){var message=options['message'];var loc=options['location'];var type=options['type'];var minVal=options['min'];var maxVal=options['max'];var position=options['pos'];if(!isUndefined(message)){ind.setMessage(message);}
if(!isUndefined(loc)){ind.setLocation(loc);}
if(!isUndefined(type)){ind.setType(type);}
if(!isUndefined(minVal)){ind.setMin(minVal);}
if(!isUndefined(maxVal)){ind.setMax(maxVal);}
if(!isUndefined(position)){ind.setPos(position);}}
return ind;},createProgressBar:function(options){var ind=new ActivityIndicator(Titanium.uiProxy.createProgressDialog());ind.setLocation(0);if(!isUndefined(options)){var message=options['message'];var loc=options['location'];var type=options['type'];var minVal=options['min'];var maxVal=options['max'];var position=options['pos'];if(!isUndefined(message)){ind.setMessage(message);}
if(!isUndefined(loc)){ind.setLocation(loc);}
if(!isUndefined(type)){ind.setType(type);}
if(!isUndefined(minVal)){ind.setMin(minVal);}
if(!isUndefined(maxVal)){ind.setMax(maxVal);}
if(!isUndefined(position)){ind.setPos(position);}}
return ind;},createTableView:function(options,callback){var tv=new TableView(Titanium.uiProxy.createTableView());tv._callback=callback;if(!isUndefined(options)){var data=options['data'];var rowHeight=options['rowHeight'];var isPrimary=options['isPrimary'];if(!isUndefined(data)){tv.setData(Titanium.JSON.stringify(data));}
if(!isUndefined(rowHeight)){tv.setRowHeight(rowHeight);}
if(!isUndefined(isPrimary)){tv.setIsPrimary(isPrimary);}}
return tv;},createButton:function(options){return new Button(Titanium.uiProxy.createButton(Titanium.JSON.stringify(options)));},createSwitch:function(options){return new Switch(Titanium.uiProxy.createSwitch(Titanium.JSON.stringify(options)));},createSlider:function(options){return new Slider(Titanium.uiProxy.createSlider(Titanium.JSON.stringify(options)));},createTextArea:function(options){return new TextArea(Titanium.uiProxy.createTextArea(Titanium.JSON.stringify(options)));},createTextField:function(options){return new TextField(Titanium.uiProxy.createTextField(Titanium.JSON.stringify(options)));},createToolbar:function(options){return null;},setTabBadge:function(id){},setStatusBarColor:function(color){}};Titanium.UI.createAlert=Titanium.UI.createAlertDialog;Titanium.UI._currentWindow=null;Titanium.UI.__defineGetter__("currentWindow",function(){if(Titanium.UI._currentWindow==null){Titanium.UI._currentWindow=new UserWindow(Titanium.uiProxy.getCurrentWindow());}
return Titanium.UI._currentWindow;});Titanium.UI.ActivityIndicator={STATUS_BAR:0,DIALOG:1,INDETERMINANT:0,DETERMINANT:1};Titanium.UI.Android={};Titanium.UI.Android.SystemIcon={ACTION:'ti:Ti:default_icon',CAMERA:'ti:Sys:ic_menu_camera',COMPOSE:'ti:Sys:ic_menu_compose',BOOKMARKS:'ti:Ti:default_icon',SEARCH:'ti:Sys:ic_menu_search',ADD:'ti:Sys:ic_menu_add',TRASH:'ti:Sys:ic_menu_delete',ORGANIZE:'ti:Sys:ic_menu_archive',REPLY:'ti:Ti:default_icon',STOP:'ti:Sys:ic_menu_stop',REFRESH:'ti:Sys:ic_menu_refresh',PLAY:'ti:Sys:ic_media_play',FAST_FORWARD:'ti:Sys:ic_media_ff',PAUSE:'ti:Sys:ic_media_pause',REWIND:'ti:Sys:ic_media_rew',EDIT:'ti:Sys:ic_menu_edit',CANCEL:'ti:Sys:ic_menu_close_clear_cancel',SAVE:'ti:Sys:ic_menu_save',DONE:'ti:Sys:ic_menu_mark',BACK:'ti:Sys:ic_menu_back',FORWARD:'ti:Sys:ic_menu_forward',HELP:'ti:Sys:ic_menu_help',HOME:'ti:Sys:ic_menu_home',NEXT:'ti:Sys:ic_media_next',PREFERENCES:'ti:Sys:ic_menu_preferences',PREVIOUS:'ti:Sys:ic_media_previous',REVERT:'ti:Sys:ic_menu_revert',SEND:'ti:Sys:ic_menu_send',SHARE:'ti:Sys:ic_menu_share',VIEW:'ti:Sys:ic_menu_view',ZOOM:'ti:Sys:ic_menu_zoom'};ActivityIndicator.prototype.setLocation=function(loc){if(!(loc==Titanium.UI.ActivityIndicator.STATUS_BAR||loc==Titanium.UI.ActivityIndicator.DIALOG)){throw new Error("Unsupported indicator location.");}
this.proxy.setLocation(loc);};ActivityIndicator.prototype.setType=function(type){if(!(type==Titanium.UI.ActivityIndicator.DETERMINANT||type==Titanium.UI.ActivityIndicator.INDETERMINANT)){throw new Error("Unsupported indicator type.");}
this.proxy.setType(type);};Titanium.UI.createNotification=function(options)
{proxy=Titanium.uiProxy.createNotification();notifier=null;if(proxy!=null){notifier=new TitaniumNotifier(proxy);if(options!=null){var title=options['title'];var message=options['message'];var color=options['color'];var delay=options['delay'];var transparency=options['transparency'];if(!isUndefined(title)){notifier.setTitle(title);}
if(!isUndefined(message)){notifier.setMessage(message);}
if(!isUndefined(color)){notifier.setColor(color);}
if(!isUndefined(delay)){notifier.setDelay(delay);}
if(!isUndefined(transparency)){notifier.setTransparency(transparency);}}}else{Titanium.API.warn("Unable to create proxy, returning null.");}
return notifier;};Titanium.UI.iPhone={BORDERED:-1,StatusBar:{OPAQUE_BLACK:-1},setStatusBarStyle:function(x){},SystemButton:{PAUSE:-1,REWIND:-1,PLAY:-1,FIXED_SPACE:-1,FLEXIBLE_SPACE:-1,}};
Titanium.fileSystemProxy=window.TitaniumFilesystem;TitaniumFile=function(f)
{this.proxy=f;};TitaniumFile.prototype.isFile=function()
{return this.proxy.isFile();};TitaniumFile.prototype.isDirectory=function()
{return this.proxy.isDirectory();};TitaniumFile.prototype.isHidden=function()
{return this.proxy.isHidden();};TitaniumFile.prototype.isSymbolicLink=function()
{return this.proxy.isSymbolicLink();};TitaniumFile.prototype.isExecutable=function()
{return this.proxy.isExecutable();};TitaniumFile.prototype.isReadonly=function()
{return this.proxy.isReadonly();};TitaniumFile.prototype.isWriteable=function()
{return this.proxy.isWriteable();};TitaniumFile.prototype.resolve=function()
{return this.proxy.resolve();};TitaniumFile.prototype.read=function()
{return this.proxy.read();};TitaniumFile.prototype.write=function(data,append)
{append=typeof(append)=='undefined'?false:append;return this.proxy.write(data,append);};TitaniumFile.prototype.readLine=function()
{return this.proxy.readLine();};TitaniumFile.prototype.copy=function(destination)
{return this.proxy.copy(destination);};TitaniumFile.prototype.move=function(destination)
{return this.proxy.move(destination);};TitaniumFile.prototype.rename=function(destination)
{return this.proxy.rename(destination);};TitaniumFile.prototype.createDirectory=function(recursive)
{recursive=typeof(recursive)=='undefined'?false:recursive;return this.proxy.createDirectory(recursive);};TitaniumFile.prototype.deleteDirectory=function(recursive)
{recursive=typeof(recursive)=='undefined'?false:recursive;return this.proxy.deleteDirectory(recursive);};TitaniumFile.prototype.deleteFile=function()
{return this.proxy.deleteFile();};TitaniumFile.prototype.getDirectoryListing=function()
{return this.proxy.getDirectoryListing();};TitaniumFile.prototype.getParent=function()
{return this.proxy.getParent();};TitaniumFile.prototype.exists=function()
{return this.proxy.exists();};TitaniumFile.prototype.createTimestamp=function()
{return this.proxy.createTimestamp();};TitaniumFile.prototype.modificationTimestamp=function()
{return this.proxy.modificationTimestamp();};TitaniumFile.prototype.name=function()
{return this.proxy.name();};TitaniumFile.prototype.extension=function()
{return this.proxy.extension();};TitaniumFile.prototype.size=function()
{return this.proxy.size();};TitaniumFile.prototype.nativePath=function()
{return this.proxy.nativePath();};TitaniumFile.prototype.spaceAvailable=function()
{return this.proxy.spaceAvailable();};TitaniumFile.prototype.setExecutable=function()
{return this.proxy.setExecutable();};TitaniumFile.prototype.setReadonly=function()
{return this.proxy.setReadonly();};TitaniumFile.prototype.setWriteable=function()
{return this.proxy.setWriteable();};TitaniumFile.prototype.toString=function()
{return String(this.proxy.toString());};TitaniumFile.createBlob=function(native){var f=new TitaniumFile(native);function TitaniumBlob(f){this.obj=f;};TitaniumBlob.prototype=f;var b=new TitaniumBlob(f);b.__defineGetter__("url",function(){return this.nativePath();});return b;};Titanium.Filesystem={createTempFile:function(){return new TitaniumFile(Titanium.fileSystemProxy.createTempFile());},createTempDirectory:function(){return new TitaniumFile(Titanium.fileSystemProxy.createTempDirectory());},getFile:function(a,b,c,d,e,f,g){var parts=[];if(arguments.length>0)parts.push(String(a));if(arguments.length>1)parts.push(String(b));if(arguments.length>2)parts.push(String(c));if(arguments.length>3)parts.push(String(d));if(arguments.length>4)parts.push(String(e));if(arguments.length>5)parts.push(String(f));if(arguments.length>6)parts.push(String(g));return new TitaniumFile(Titanium.fileSystemProxy.getFile(parts));},getFileStream:function(a,b,c,d,e,f,g){var parts=[];if(arguments.length>0)parts.push(String(a));if(arguments.length>1)parts.push(String(b));if(arguments.length>2)parts.push(String(c));if(arguments.length>3)parts.push(String(d));if(arguments.length>4)parts.push(String(e));if(arguments.length>5)parts.push(String(f));if(arguments.length>6)parts.push(String(g));return TitaniumFile(Titanium.fileSystemProxy.getFileStream(parts));},getApplicationDirectory:function(){return new TitaniumFile(Titanium.fileSystemProxy.getApplicationDirectory());},getApplicationDataDirectory:function(private){private=typeof(private)=='undefined'?false:private;return new TitaniumFile(Titanium.fileSystemProxy.getApplicationDataDirectory(private));},getResourcesDirectory:function(){return new TitaniumFile(Titanium.fileSystemProxy.getResourcesDirectory());},getUserDirectory:function(){return new TitaniumFile(Titanium.fileSystemProxy.getUserDirectory());},getLineEnding:function(){return"\n";},getSeparator:function(){return";";},getRootDirectories:function(){var results=Titanium.fileSystemProxy.getRootDirectories();if(results)
{var files=[];for(var c=0;c<results.length;c++)
{files[c].push(new TitaniumFile(results[c]));}
return files;}
return[];},asyncCopy:function(){return Titanium.fileSystemProxy.asyncCopy(arguments);},isExternalStoragePresent:function(){return Titanium.fileSystemProxy.isExternalStoragePresent();}};
Titanium.mediaProxy=window.TitaniumMedia;var Sound=function(proxy){this.proxy=proxy;this.play=function(){this.proxy.play();};this.pause=function(){this.proxy.pause();};this.stop=function(){this.proxy.stop();};this.reset=function(){this.proxy.reset();};this.release=function(){this.proxy.release();};this.setVolume=function(v){this.proxy.setVolume(v);};this.getVolume=function(){return this.proxy.getVolume();};this.setLooping=function(loop){this.proxy.setLooping(loop);};this.isLooping=function(){return this.proxy.isLooping();};this.isPlaying=function(){return this.proxy.isPlaying();};this.isPaused=function(){return this.proxy.isPaused();};this.addEventListener=function(eventName,listener){return this.proxy.addEventListener(eventName,registerCallback(this,listener));};this.removeEventListener=function(eventName,listenerId){this.proxy.removeEventListener(eventName,listenerId);}};var Video=function(proxy){this.proxy=proxy;this.errorId=-1;this.completeId=-1;this.play=function(){this.proxy.play();};this.pause=function(){this.proxy.pause();};this.stop=function(){this.proxy.stop();};this.reset=function(){this.proxy.reset();};this.release=function(){if(this.errorId!=-1){this.proxy.removeListener("error",this.errorId);this.errorId=-1;}
if(this.completeId!=-1){this.proxy.removeListener("complete",this.completeId);this.completeId=-1;}
this.proxy.release();};this.isPlaying=function(){return this.proxy.isPlaying();};this.isPaused=function(){return this.proxy.isPaused();};this.addEventListener=function(eventName,listener){return this.proxy.addEventListener(eventName,registerCallback(this,listener));};this.removeEventListener=function(eventName,listenerId){this.proxy.removeEventListener(eventName,listenerId);}};Titanium.Media={beep:function(){Titanium.mediaProxy.beep();},createSound:function(url){return new Sound(Titanium.mediaProxy.createSound(url));},vibrate:function(){Titanium.mediaProxy.vibrate(null);},showCamera:function(options){var userSuccess=transformObjectValue(options.success,function(){});var userCancel=transformObjectValue(options.cancel,function(){});var userError=transformObjectValue(options.error,function(){});var blob=Titanium.mediaProxy.createBlob();var success=registerCallback(this,function(attrs){var b=TitaniumFile.createBlob(blob);b.width=attrs.w;b.height=attrs.h;userSuccess(b);});var cancel=registerCallback(this,function(){blob=null;userCancel();});var error=registerCallback(this,function(err){blob=null;userError(err);});var args={saveToPhotoGallery:options.saveToPhotoGallery};Titanium.mediaProxy.showCamera(success,cancel,error,Titanium.JSON.stringify(args),blob);},openPhotoGallery:function(options){var userSuccess=transformObjectValue(options.success,function(){});var userCancel=transformObjectValue(options.cancel,function(){});var userError=transformObjectValue(options.error,function(){});var blob=Titanium.mediaProxy.createBlob();var success=registerCallback(this,function(attrs){var b=TitaniumFile.createBlob(blob);b.width=attrs.w;b.height=attrs.h;userSuccess(b);});var cancel=registerCallback(this,function(){blob=null;userCancel();});var error=registerCallback(this,function(err){blob=null;userError(err);});Titanium.mediaProxy.openPhotoGallery(success,cancel,error,blob);},previewImage:function(options){var success=registerCallback(this,transformObjectValue(options.success,function(){}));var error=registerCallback(this,transformObjectValue(options.error,function(){}));var img=options.image;var blob=Titanium.mediaProxy.createBlob();blob.setUrl(img.url);Titanium.mediaProxy.previewImage(success,error,blob);},createVideoPlayer:function(options){var player=null;if(!isUndefined(options)){var proxy=Titanium.mediaProxy.createVideoPlayer(Titanium.JSON.stringify(options));if(proxy!=null){player=new Video(proxy);if(!isUndefined(options.complete)){player.completeId=addEventListener("complete",registerCallback(this,options.complete));}
if(!isUndefined(options.error)){player.errorId=addEventListener("error",registerCallback(this,options.error));}}}
return player;}};
Titanium.networkProxy=window.TitaniumNetwork;var HTTPClient=function(){this.obj;this._onreadystatechange;this.getReadyState=function(){return this.obj.getReadyState();};this.getResponseText=function(){return this.obj.getResponseText();};this.getStatus=function(){return this.obj.getStatus();};this.getStatusText=function(){return this.obj.getStatusText();};this.abort=function(){this.obj.abort();};this.getAllResponseHeaders=function(){return this.obj.getAllResponseHeaders();};this.getResponseHeader=function(header){return this.obj.getResponseHeader(header);};this.open=function(method,url){this.obj.open(method,url);};this.send=function(){for(i=0;i<arguments.length;i++){d=arguments[i];for(key in d){value=d[key];type=typeof value;if(type!='object'){this.obj.addPostData(key,String(value));}else if(type.indexOf('TitaniumBlob')!=-1){Titanium.API.error("send: typeof="+typeof value);this.obj.addTitaniumFileAsPostData(key,value.obj.proxy);}else{this.obj.addTitaniumFileAsPostData(key,value.proxy);}}}
this.obj.send(null);};this.setRequestHeader=function(name,value){this.obj.setRequestHeader(name,value);};this.setOnReadyStateChange=function(f){_onreadystatechange=f;this.obj.setOnReadyStateChangeCallback(registerCallback(this,f));};};HTTPClient.prototype.__defineGetter__("onreadystatechange",function(){return this._onreadystatechange});HTTPClient.prototype.__defineSetter__("onreadystatechange",function(f){this.setOnReadyStateChange(f);});HTTPClient.prototype.__defineGetter__("readyState",function(){return this.getReadyState();});HTTPClient.prototype.__defineGetter__("responseText",function(){return this.getResponseText();});HTTPClient.prototype.__defineGetter__("status",function(){return this.getStatus();});HTTPClient.prototype.__defineGetter__("statusText",function(){return this.getStatusText();});Titanium.Network={createTCPSocket:function(){},createIRCClient:function(){},createIPAddress:function(){},createHTTPClient:function(){var c=new HTTPClient();c.obj=Titanium.networkProxy.createHTTPClient();return c;},getHostByName:function(){},getHostByAddress:function(){},encodeURIComponent:function(x){return window.encodeURIComponent(x);},decodeURIComponent:function(x){return window.decodeURIComponent(x);},addEventListener:function(eventName,listener){return Titanium.networkProxy.addEventListener(eventName,registerCallback(this,listener));},removeEventListener:function(eventName,listenerId){Titanium.networkProxy.removeEventListener(eventName,listenerId);},addConnectivityListener:function(f){var fn=function(data){f(data.online,data.type);};return Titanium.networkProxy.addConnectivityListener(registerCallback(this,fn));},removeConnectivityListener:function(id){return removeEventListener('connectivity',id);},NETWORK_NONE:0,NETWORK_WIFI:1,NETWORK_MOBILE:2,NETWORK_LAN:3,NETWORK_UNKNOWN:4};Titanium.Network.__defineGetter__("online",function(){return Titanium.networkProxy.isOnline();});Titanium.Network.__defineGetter__("networkTypeName",function(){return Titanium.networkProxy.getNetworkTypeName();});Titanium.Network.__defineGetter__("networkType",function(){return Titanium.networkProxy.getNetworkType();});Titanium.Net=Titanium.Network;
Titanium.platformProxy=window.TitaniumPlatform;Titanium.Platform={createUUID:function(){return Titanium.platformProxy.createUUID();},openApplication:function(app){return Titanium.platformProxy.openApplication(app);},openURL:function(url){return Titanium.platformProxy.openUrl(url);},logInstalledApplicationNames:function(){Titanium.platformProxy.logInstalledApplicationNames();}};Titanium.Platform.__defineGetter__("ostype",function(){return Titanium.platformProxy.getOsType();});Titanium.Platform.__defineGetter__("name",function(){return Titanium.platformProxy.getModuleName();});Titanium.Platform.__defineGetter__("version",function(){return Titanium.platformProxy.getVersion();});Titanium.Platform.__defineGetter__("architecture",function(){return Titanium.platformProxy.getArchitecture();});Titanium.Platform.__defineGetter__("address",function(){return Titanium.platformProxy.getAddress();});Titanium.Platform.__defineGetter__("id",function(){return Titanium.platformProxy.getId();});Titanium.Platform.__defineGetter__("model",function(){return Titanium.platformProxy.getModel();});Titanium.Platform.__defineGetter__("macddress",function(){return Titanium.platformProxy.getMacAddress();});Titanium.Platform.__defineGetter__("processorCount",function(){return Titanium.platformProxy.getProcessorCount();});Titanium.Platform.__defineGetter__("username",function(){return Titanium.platformProxy.getUsername();});Titanium.Platform.__defineGetter__("availableMemory",function(){return Titanium.platformProxy.getAvailableMemory();});Titanium.Platform.__defineGetter__("phoneNumber",function(){return Titanium.platformProxy.getPhoneNumber();});
Titanium.analyticsProxy=window.TitaniumAnalytics;Titanium.Analytics={addEvent:function(name,data)
{return transformObjectValue(Titanium.analyticsProxy.addEvent(name,data),null);}};
Titanium.databaseProxy=window.TitaniumDatabase;function throwIfException(e){if(!isUndefined(e)){throw new Error(e);}};var ResultSet=function(rs){this.proxy=rs;this.close=function(){this.proxy.close();};this.field=function(index){return this.proxy.getField(index);};this.fieldByName=function(fieldName){var name=this.proxy.getFieldByName(fieldName);throwIfException(this.proxy.getLastException());return name;};this.fieldCount=function(){return this.proxy.getFieldCount();};this.fieldName=function(index){return this.proxy.getFieldName(index);};this.rowCount=function(){return this.proxy.getRowCount();};this.getRowCount=function(){return this.proxy.getRowCount();};this.isValidRow=function(){return this.proxy.isValidRow();};this.next=function(){return this.proxy.next();};};var DB=function(db){this.proxy=db;this.close=function(){if(!isUndefined(this.proxy)){this.proxy.close();}};this.execute=function(sql){qargs=[];for(var i=1;i<arguments.length;i++){qargs.push(String(arguments[i]));}
var rs=this.proxy.execute(sql,qargs);throwIfException(this.proxy.getLastException());var trs=null;if(rs!=null){trs=new ResultSet(rs);}
return trs;};this.getLastInsertRowId=function(){return this.proxy.getLastInsertRowId();};this.getRowsAffected=function(){return this.proxy.getRowsAffected();};this.remove=function(){this.proxy.remove();};};DB.prototype.__defineGetter__("lastInsertRowId",function(){return this.getLastInsertRowId();});DB.prototype.__defineGetter__("rowsAffected",function(){return this.getRowsAffected();});Titanium.Database={open:function(name){db=new DB(Titanium.databaseProxy.open(name));throwIfException(Titanium.databaseProxy.getLastException());return db;},};
Titanium.accelerometerProxy=window.TitaniumAccelerometer;Titanium.Accelerometer={addEventListener:function(eventName,listener){return Titanium.accelerometerProxy.addEventListener(eventName,registerCallback(this,listener));},removeEventListener:function(eventName,listenerId){Titanium.accelerometerProxy.removeEventListener(eventName,listenerId);}};
Titanium.gestureProxy=window.TitaniumGesture;Titanium.Gesture={PORTRAIT:0x02,UPSIDE_PORTRAIT:0x04,LANDSCAPE:0x10,LANDSCAPE_LEFT:0x10,LANDSCAPE_RIGHT:0x8,isPortrait:function(orientation){return(orientation&0x06)!=0;},isLandscape:function(orientation){return(orientation&0x18)!=0;},addEventListener:function(eventName,listener){return Titanium.gestureProxy.addEventListener(eventName,registerCallback(this,listener));},removeEventListener:function(eventName,listenerId){Titanium.gestureProxy.removeEventListener(eventName,listenerId);}};
Titanium.geoProxy=window.TitaniumGeolocation;Titanium.Geolocation={UNKNOWN_ERROR:0,PERMISSION_DENIED:1,POSITION_UNAVAILABLE:2,TIMEOUT:3,getCurrentPosition:function(success,failure,options){var o=transformObjectValue(options,{});var json=Titanium.JSON.stringify(o);Titanium.geoProxy.getCurrentPosition(registerCallback(this,success),registerCallback(this,failure),json);},watchPosition:function(success,failure,options){var o=transformObjectValue(options,{});var json=Titanium.JSON.stringify(o);return Titanium.geoProxy.watchPosition(registerCallback(this,success),registerCallback(this,failure),json);},clearWatch:function(watchId){Titanium.geoProxy.clearWatch(watchId);}};