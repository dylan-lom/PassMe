12SDD Major Project Report
==========================

Contents
--------

[1 Interface Design](#1)  
[1.1 Target Audience](#1.1)  
[1.2 Ergonomic Issues](#1.2)  
[2 Program Development & Techniques](#2)  
[2.2 Correct Code Development](#2.2)  
[2.3 Modularisation of Code](#2.3)  
[2.4 Effective and Effecient Use of Correct Control Structures](#2.4)  
[2.5 Effective Use of Appropriate Data Structures](#2.5)  
[3 User Documentation](#3)  
[3.1 Installation Guide](#3.1)  
[3.2 User Manual / Technical Specifications](#3.2)  
[3.3 Walkthrough](#3.3)  
[4 Technical Documentation](#4)  
[4.1 Instrinsic Documentation](#4.1)  
[4.2 Extrinsic Documentation](#4.2)  
[5 Project Blog](#5)  
[6 Communication](#6)  
[6.1 Agenda for Progress Meeting](#6.1)  
[6.2 Minutes of Progress Meeting](#6.2)  
[7 Testing the Software Solution](#7)  
[7.1 Comparison to Original Design Specifications](#7.1)  
[7.2 Level Testing](#7.2)  
[7.3 Live Test Data](#7.3)  
[7.4 Software Debugging Techniques](#7.4)  
[7.5 Software Debugging Tools](#7.5)  
[8 End User Testing](#8)  
[8.1 Test Plan](#8.1)  
[8.2 Test Data](#8.2)  
[8.3 Test Results](#8.3)  

<hr>

<h2 id="1">1 Interface Design</h2>

<h3 id="1.1">1.1 Target Audience</h3>

Since the extension is still in a Beta-testing state, and relys on the evolving Ethereum blockchain, the user-interface and installation process is still targeted at more technical users.

The interface remains relatively simple, as there isn't much interaction required.

Early prototypes had several 'modes' of operation, which allowed for the user to either

* Click an autofill button
* Manually fetch a site's password to the clipboard
* Automatically add a site's details
* Manually add a site's details

However, I have chosen simplicity of operation over these features, due to the project's early stages in development.

I can later add such features based on user feedback if requested.

<h3 id="1.2">1.2 Ergonomic Issues</h3>

Since the application is a chrome extension, which uses web standards (HTML, CSS, JavaScript), ataining consistancy in the design was achieved through CSS styling of HTML elements, which can be re-used consistantly.

The interface itself is a simple and monochromatic, giving it a clean and uniform appearance. I chose the Verdana font, since it is ubiquitos and readable.

I followed the HTML5 specifications and implemented elements for their designed purposes (e.g. a button to trigger JavaScript actions), and followed conventions in Web development, like embedding JavaScript files, rather than writing in-line with script elements.

One consideration was which web browser(s) I should support, I decided on Chrome (despite personally prefering Firefox), due to the [overwhelming market share](https://en.wikipedia.org/wiki/Usage_share_of_web_browsers#Summary_tables) of chrome and chromium browsers.

This choice does exclude some users, however the [web app](../PassMe/) is still available to all users whose browsers may be supported by MetaMask.

<hr>

<h2 id="2">2 Program Development & Techniques</h2>

<h3 id="2.1">2.1 Correct Code Generation</h3>

<h3 id="2.2">2.2 Modularisation of Code</h3>

In my project I modularised code into useful functions, and then seperated them into discrete files based on functionality &mdash; for example the "contract.js" script file contains modules relating to the creation of a Web3 Contract object, that can be used to communicate with the Ethereum blockchain.

<h3 id="2.3">2.3 Effective and Efficient Use of Correct Control Structures</h3>

<h3 id="2.4">2.4 Effective Use of Appropriate Data Structures</h3>

In designing my solution, I mainly used simple, inbuilt datastructures, but also implemented a couple of my own for my advanced procuders:

1. In "watcher.js" I created the `HTElements` JavaScript elements, which combines HTML elements, such as buttons and text-boxes, in a uniform datastructure, following the format: `HTElements.Subroutine.Id`

2. In the "PassMe.sol" (solidity smart contract), I implemented the `Pass` struct, which moved away *NoteChain's* (the contract I derived *PassMe* from) `Note` struct, due to different requirements of the projects. For example I changed the `content` property to a `bytes32` type from `bytes`, since the hashed password will be of known length; I also removed the `publicKey` property and it's related functionality, since a password storage algorithm doesn't need to make user data publicly accessible.

<hr>

<h2 id="3">3 User Documentation</h2>

<h3 id="3.1">3.1 Installation Guide</h3>

The installation guide is available [here](install.html)

<h3 id="3.2">3.2 User Manual / Technical Specifications</h3>

Since my project is a chrome extension, with very a simple user interface, there is very little need for a user manual, instead I've written a document about the technical workings of the extension &mdash; relating to the encryption models used in storing and reading passwords from the blockchain, along with other security measures.

The technical specifications document is available [here](technical.html)

<h3 id="3.3">3.3 Walkthrough</h3>

A video walkthrough of installing the extension and saving a password is available [here](walkthrough.html)

<hr>

<h2 id="4">4 Technical Documentation</h2>

<h3 id="4.1">4.1 Intrinsic Documentation</h3>

<h3 id="4.2">4.2 Extrinsic Documentation</h3>

<hr>

<h2 id="5">5 Project Blog</h2>

Project blog is available [here](../log/)

<hr>

<h2 id="6">6 Communication</h2>

<h3 id="6.1">6.1 Agenda for Progress Meeting</h3>

<h3 id="6.2">6.2 Minutes of Pogress Meeting</h3>

> minutes here

<hr>

<h2 id="7">7 Testing the Software Solution</h2>

<h3 id="7.1">7.1 Comparison to Original Design Specifications</h3>

<h3 id="7.2">7.2 Level Testing</h3>

<h3 id="7.3">7.3 Live Test Data</h3>

<h3 id="7.4">7.4 Software Debugging Techniques</h3>

<h3 id="7.5">7.5 Software Debugging Tools</h3>

<hr>

<h2 id="8">8 End User Testing</h2>

<h3 id="8.1">8.1 Test Plan</h3>

<h3 id="8.2">8.2 Test Data</h3>

<h3 id="8.3">8.3 Test Results</h3>
