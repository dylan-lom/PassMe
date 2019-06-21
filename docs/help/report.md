12SDD Major Project Report
==========================

Interface Design
----------------

### Target Audience

Since the extension is still in a Beta-testing state, and relys on the evolving Ethereum blockchain, the user-interface and installation process is still targeted at more technical users.

The interface remains relatively simple, as there isn't much interaction required.

Early prototypes had several 'modes' of operation, which allowed for the user to either

* Click an autofill button
* Manually fetch a site's password to the clipboard
* Automatically add a site's details
* Manually add a site's details

However, I have chosen simplicity of operation over these features, due to the project's early stages in development.

I can later add such features based on user feedback if requested.

### Ergonomic Issues

Since the application is a chrome extension, which uses web standards (HTML, CSS, JavaScript), ataining consistancy in the design was achieved through CSS styling of HTML elements, which can be re-used consistantly.

The interface itself is a simple and monochromatic, giving it a clean and uniform appearance. I chose the Verdana font, since it is ubiquitos and readable.

I followed the HTML5 specifications and implemented elements for their designed purposes (e.g. a button to autofill), and followed conventions in Web development, like embedding JavaScript files, rather than writing in-line with script elements.


Program Development & Techniques
--------------------------------

### Correct Code Generation

### Modularisation of Code

In my project I modularised code into useful functions, and then seperated them into discrete files based on functionality &mdash; for example the "contract.js" script file contains modules relating to the creation of a Web3 Contract object, that can be used to communicate with the Ethereum blockchain.

### Effective and Efficient Use of Correct Control Structures

### Effective Use of Appropriate Data Structures

In designing my solution, I mainly used simple, inbuilt datastructures, but also implemented a couple of my own for my advanced procuders:

1. In "watcher.js" I created the `HTElements` JavaScript elements, which combines HTML elements, such as buttons and text-boxes, in a uniform datastructure, following the format: `HTElements.Subroutine.Id`

2. In the "PassMe.sol" (solidity smart contract), I implemented the `Pass` struct, which moved away *NoteChain's* (the contract I derived *PassMe* from) `Note` struct, due to different requirements of the projects. For example I changed the `content` property to a `bytes32` type from `bytes`, since the hashed password will be of known length; I also removed the `publicKey` property and it's related functionality, since a password storage algorithm doesn't need to make user data publicly accessible.

User Documentation
------------------

### Installation Guide

The installation guide is available [here](install.html)

### User Manual / Technical Specifications

Since my project is a chrome extension, with very a simple user interface, there is very little need for a user manual, instead I've written a document about the technical workings of the extension &mdash; relating to the encryption models used in storing and reading passwords from the blockchain, along with other security measures.

The technical specifications document is available [here](technical.html)

### Walkthrough

A video walkthrough of installing the extension and saving a password is available [here](walkthrough.html)

Technical Documentation
-----------------------

### Intrinsic Documentation

### Extrinsic Documentation

Project Blog
------------

Project blog is available [here](../log/)

Communication
-------------

### Agenda for Progress Meeting

### Minutes of Pogress Meeting
> minutes here

Testing the Software Solution
-----------------------------

### Comparison to Original Design Specifications

### Level Testing

### Live Test Data

### Software Debugging Techniques

### Software Debugging Tools

End User Testing
----------------

### Test Plan

### Test Data

### Test Results
