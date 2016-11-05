# Welcome to the tools section


# How to upgrade npm on Windows?

Run as Adminstrator a Windows Powershell:

```
npm install -g npm-windows-upgrade
Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
npm-windows-upgrade
```

# How to solve too long paths in node_modules on Windows?

One solution is to use the tool `robocopy`.
You can call it like this:

```
robocopy . node_modules /purge
rd /s node_modules
```

The `purge`parameter ensures that all file from source which do not
exist at destination are removed. I found that solution here:
http://web.ageofascent.com/reduce-node_modules-recursion-long-paths-asp-net-5/

