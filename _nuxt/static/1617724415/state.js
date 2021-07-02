window.__NUXT__=(function(a,b,c,d,e,f,g){return {staticAssetsBase:"\u002Fwolfpal\u002F_nuxt\u002Fstatic\u002F1617724415",layout:"default",error:null,state:{categories:{en:{"Getting started":[{slug:"index",title:d,category:b,to:e},{slug:"installation",title:b,category:b,to:"\u002Finstallation"},{slug:"configuration",title:"Configuration",category:b,to:"\u002Fconfiguration"},{slug:"docker",title:"Docker",category:b,to:"\u002Fdocker"},{slug:"sendgrid",title:"Sendgrid",category:b,to:"\u002Fsendgrid"}],API:[{slug:"api",title:d,category:a,to:"\u002Fapi"},{slug:"api-auth",title:"Auth",category:a,to:"\u002Fapi-auth"},{slug:"api-user",title:"User",category:a,to:"\u002Fapi-user"},{slug:"api-account",title:"Account",category:a,to:"\u002Fapi-account"},{slug:"api-notifications",title:"Notifications",category:a,to:"\u002Fapi-notifications"},{slug:"api-stats",title:"Stats",category:a,to:"\u002Fapi-stats"},{slug:"api-goals",title:"Goals",category:a,to:"\u002Fapi-goals"}],Community:[{slug:"releases",title:"Releases",category:"Community",to:"\u002Freleases"}]}},releases:[{name:"1.4.0",date:"2021-03-24T20:47:28Z",body:"\u003Cul\u003E\n\u003Cli\u003EDeprecated Landing page with new clean version\u003C\u002Fli\u003E\n\u003Cli\u003EImplement \u002Fgoals\u002Fweekly\u002F:goal_id\u002Fnot-complete endpoint\u003C\u002Fli\u003E\n\u003Cli\u003EUpdate devSMTP config to be configurable\u003C\u002Fli\u003E\n\u003Cli\u003EUpdate devSMTP config to be configurable\u003C\u002Fli\u003E\n\u003Cli\u003EUpdate mark weekly goal as complete\u003C\u002Fli\u003E\n\u003Cli\u003EUpdate \u002Fgoals\u002Fweekly\u002F:goal_id\u002Fcomplete endpoint\u003C\u002Fli\u003E\n\u003Cli\u003EMigration front-end to use Error Codes\u003C\u002Fli\u003E\n\u003Cli\u003EMigration to auto import components\u003C\u002Fli\u003E\n\u003Cli\u003EImplement Dev SMTP into Nodemailer on API\u003C\u002Fli\u003E\n\u003Cli\u003EImplement Dev SMTP into Nodemailer on BW\u003C\u002Fli\u003E\n\u003Cli\u003EUpdate Docs with new responses\u003C\u002Fli\u003E\n\u003Cli\u003EUpdate API to Error Codes\u003C\u002Fli\u003E\n\u003Cli\u003EMigration to Tailwind 2.x.x\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n"},{name:"1.3.0",date:"2021-01-22T23:23:42Z",body:"\u003Cul\u003E\n\u003Cli\u003EAdded background worker for sending emails on weekly goals.\u003C\u002Fli\u003E\n\u003Cli\u003ENow uses the API as a fallback to user-agent.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded new device list with revoke per session and revoke all.\u003C\u002Fli\u003E\n\u003Cli\u003EFixed a bug where the database could be filled with sessions.  Now after getting a new session it will delete the old one.\u003C\u002Fli\u003E\n\u003Cli\u003EMade it so unless account is activated that your limited but can still login.  Which makes it so once your create account it logs you in.\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n"},{name:"1.2.0",date:"2020-12-10T04:40:00Z",body:"\u003Cul\u003E\n\u003Cli\u003EUpdated packages for the server, docs, and clients.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded Profile to account page.\u003C\u002Fli\u003E\n\u003Cli\u003EUpdated API endpoints to have the same format such as change-email, change-password, and change-username\u003C\u002Fli\u003E\n\u003Cli\u003EAdded notifications endpoint for email notifications.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded notifications for emails on weekly goals to front-end\u003C\u002Fli\u003E\n\u003Cli\u003EAdded notifications tests\u003C\u002Fli\u003E\n\u003Cli\u003EAdded new weekly goals to the store.\u003C\u002Fli\u003E\n\u003Cli\u003EChange analytics to stats\u003C\u002Fli\u003E\n\u003Cli\u003EAdded Two Factor support with backup-codes support.\u003C\u002Fli\u003E\n\u003Cli\u003EFixed UI bug when viewed on smaller screens for weekly goals list.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded Two Factor tests.\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n"},{name:"1.1.0",date:"2020-11-12T17:06:38Z",body:"\u003Cul\u003E\n\u003Cli\u003EAdded prettier config to eslint.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded 500 error page.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded 404 error page.\u003C\u002Fli\u003E\n\u003Cli\u003EFixed FA icons sizes\u003C\u002Fli\u003E\n\u003Cli\u003ERedesigned the activate account with token page.\u003C\u002Fli\u003E\n\u003Cli\u003ERedesigned the forgot password with token page.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded Account Page.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded Update email endpoint.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded Update password endpoint\u003C\u002Fli\u003E\n\u003Cli\u003EAdded Offline Banner\u003C\u002Fli\u003E\n\u003Cli\u003EAdded Docker Support for both client and server.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded Basic docs for both docker and docker-compose.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded Tests to the Server.\u003C\u002Fli\u003E\n\u003Cli\u003ECleaned up the code a fair bit.\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n"},{name:"1.0.1",date:"2020-09-20T01:03:16Z",body:"\u003Cul\u003E\n\u003Cli\u003EFixed a nuxt bug with a custom api.\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n"},{name:"1.0.0",date:"2020-09-20T00:24:04Z",body:"\u003Cp\u003EThe official version is out ✨\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003EAdded both front-end and back-end.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded basic login and register with email verify.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded weekly goal page.\u003C\u002Fli\u003E\n\u003Cli\u003EAdded dashboard goal page analytics.\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n"}],settings:{title:"WolfPal",url:"https:\u002F\u002Fmrdemonwolf.github.io\u002Fwolfpal\u002F",defaultDir:"docs",defaultBranch:"master",filled:c,logo:{light:"\u002Fwolfpal\u002Flogo-text.svg",dark:"\u002Fwolfpal\u002Flogo-text-dark.svg"},github:"MrDemonWOlf\u002Fwolfpal",twitter:"MrDemonWolf"},menu:{open:f},i18n:{routeParams:{}}},serverRendered:c,routePath:e,config:{content:{dbHash:"3ad704d4"}},__i18n:{langs:{en:{search:{placeholder:"Search the docs (Press \"\u002F\" to focus)"},toc:{title:"On this page"},article:{github:"Edit this page on GitHub"}}}},colorMode:{preference:g,value:g,unknown:c,forced:f}}}("API","Getting started",true,"Introduction","\u002F",false,"system"));