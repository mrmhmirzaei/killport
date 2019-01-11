<p><strong>Preface</strong></p>
<p>You try run/execute an script that use a TCP/IP port (Like : run a server) and get an error.</p>
<pre class="language-markup"><code>Error: That port is already in use.</code></pre>
<p>In unix base os (Mac OS/Linux) we use kill in Terminal but we have to find process id first then kill that, isn`t it ? Or search for solution(s) in google and click on first result (stackoverflow).</p>
<p>I found a good answer in&nbsp;stackoverflow to see the answer scroll down. So i use that answer and made an script with nodejs and published at npm.org.</p>
<p>&nbsp;</p>
<p><strong>Installation</strong></p>
<p>First you have installed nodejs and npm in your system then open a terminal and install my package via npm.</p>
<pre class="language-javascript"><code>(sudo) npm i -g mrkillport</code></pre>
<p>Q : Why i named this package "mrkillport" ?</p>
<p>A : I don`t know but "killport" reserved by another one and i change my package name to this.</p>
<p>&nbsp;</p>
<p><strong>How to user?</strong></p>
<p>It`s easy just type this line on your terminal too.</p>
<pre class="language-javascript"><code>(sudo) killport &lt;port&gt;</code></pre>
<p>And it will find a process that uses the port you entered and ask a question to confirm kill that; done!</p>
<p>&nbsp;</p>
<p><span style="text-decoration: underline;">Links</span> :</p>
<p><a href="https://stackoverflow.com/questions/9346211/how-to-kill-a-process-on-a-port-on-ubuntu/29985440#29985440" target="_blank" rel="noopener">Stackoverflow</a></p>
