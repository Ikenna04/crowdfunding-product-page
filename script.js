const bookmark = document.getElementById('bookmark'),
	bookPara = document.querySelector('.bookmark c'),
	radio = document.querySelectorAll('.radio'),
	catHead = document.querySelectorAll('.cat-head'),
	inputPledge = document.querySelectorAll('.input-pledge'),
	pledge = document.querySelectorAll('.pledge'),
	pledgeBtn = document.querySelectorAll('.pledge-btn'),
	stat = document.querySelectorAll('.stat'),
	modalBtn = document.querySelectorAll('.modal-btn'),
	pledgePopUp = document.querySelectorAll('.pledge-pop-up'),
	success = document.querySelectorAll('.success'),
	lis = document.querySelectorAll('.li li'),
	amountArea = document.querySelectorAll('.amount-area'),
	successBtn = document.querySelectorAll('.success-btn'),
	navLinks = document.querySelectorAll('.nav-links'),
	mobileIcons = document.querySelector('.mobile-icons');

let numPattern,
	isNum,
	errorP,
	pledgeArray = [25, 75, 200],
	generatedAmount,
	totalPledgers,
	pledgers,
	generatedTotal,
	pledgeAmount,
	c,
	d,
	f,
	h,
	m,
	myString1;

// | SHOW NAV LINKS
mobileIcons.addEventListener('click', () => {
	mobileIcons.classList.toggle('show'),
		navLinks.forEach(e => e.classList.toggle('show'));
});

// | FADE FINISHED ITEMS
const opFinished = () => {
	for (let i = 0; i < amountArea.length; i++) {
		m = Number(amountArea[i].children[0].textContent);
		m == 0
			? amountArea[
					i
			  ].parentElement.parentElement.parentElement.classList.contains('li')
				? amountArea[i].parentElement.parentElement.classList.add('oped')
				: amountArea[
						i
				  ].parentElement.parentElement.parentElement.parentElement.classList.contains(
						'li'
				  )
				? amountArea[i].parentElement.parentElement.parentElement.classList.add(
						'oped'
				  )
				: ''
			: '';
	}
};
opFinished();

// | SHOW SUCCESS POP UP
for (let i = 0; i < successBtn.length; i++) {
	successBtn[i].addEventListener('click', () => {
		for (let i = 0; i < success.length; i++) {
			success[i].classList.toggle('show');
		}
	});
}

// | SHOW PLEDGE POP UP
for (let i = 0; i < modalBtn.length; i++) {
	modalBtn[i].addEventListener('click', () => {
		for (let i = 0; i < pledgePopUp.length; i++) {
			pledgePopUp[i].classList.toggle('show');
		}

		radio.forEach(e => {
			e.parentElement.parentElement.classList.remove('clicked');
		});
	});
}

// | EDIT PLEDGE BTN EVENTS
for (let i = 0; i < pledgeBtn.length; i++) {
	pledgeBtn[i].addEventListener('click', () => {
		numPattern = /[0-9]/g;

		if (pledgeBtn[i].classList.contains('first')) {
			isNum = true;
		} else {
			for (let j = 0; j < pledge.length; j++)
				for (let k = 0; k < pledgeArray.length; k++)
					pledge[i - 1].value < pledgeArray[i - 1]
						? ((isNum = false),
						  (pledgeBtn[i].nextElementSibling.textContent = `Amount is less`))
						: pledge[i - 1].value.match(numPattern)
						? ((isNum = true),
						  (pledgeBtn[i].nextElementSibling.textContent = ' '))
						: ((isNum = false),
						  (pledgeBtn[i].nextElementSibling.textContent = 'Numbers only'));
		}

		generatedAmount = stat[0].innerHTML;
		pledgers = stat[1].innerHTML;
		f = Number(pledgers.toString().replace(/[^0-9\.]/g, ''));
		c = Number(generatedAmount.toString().replace(/[^0-9\.]/g, ''));

		if (isNum) {
			!pledgeBtn[i].classList.contains('first')
				? ((d = Number(pledge[i - 1].value)),
				  (stat[0].parentElement.parentElement.nextElementSibling.firstElementChild.style.width =
						(d + c) / 1000 + '%'),
				  (generatedTotal = `$${String(d + c).replace(
						/\B(?=(\d{3})+(?!\d))/g,
						','
				  )}`),
				  (h = Number(amountArea[i + 2].children[0].textContent)),
				  h == 0
						? (lis[i - 1].classList.add('oped'),
						  lis[i + 3].classList.add('oped'))
						: (h--,
						  (amountArea[i - 1].innerHTML = `<h1>${h}</h1><span>left</span>`),
						  (amountArea[i + 2].innerHTML = `<h3>${h}</h3><span>left</span>`)),
				  h == 0
						? (lis[i - 1].classList.add('oped'),
						  lis[i + 3].classList.add('oped'))
						: '')
				: (generatedTotal = generatedAmount);

			f++;
			totalPledgers = String(f).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

			stat[0].textContent = generatedTotal;
			stat[1].textContent = totalPledgers;

			for (let i = 0; i < pledgePopUp.length; i++)
				pledgePopUp[i].classList.remove('show');

			for (let i = 0; i < success.length; i++) success[i].classList.add('show');
		}
	});
}

// | RESET PLEDGE VALUE
for (let i = 0; i < pledge.length; i++) {
	pledge[i].addEventListener('click', () => {
		pledge[i].value = pledgeArray[i];
	});
}

// | ADD CLICKED TO THE PLEDGE INPUT PART
for (let i = 0; i < inputPledge.length; i++) {
	inputPledge[i].addEventListener('click', () => {
		inputPledge.forEach(e => {
			e.classList.remove('clicked');
		});
		inputPledge[i].classList.add('clicked');

		!pledgeBtn[i].classList.contains('first')
			? (pledgeBtn[i].nextElementSibling.textContent = ' ')
			: '';
	});
}

// | ADD CLICKED TO LI
for (let i = 0; i < radio.length; i++) {
	radio[i].addEventListener('click', () => {
		radio[i].parentElement.parentElement.classList.contains('clicked')
			? radio[i].parentElement.parentElement.classList.remove('clicked')
			: radio.forEach(e => {
					e.parentElement.parentElement.classList.remove('clicked');
					radio[i].parentElement.parentElement.classList.add('clicked');
			  });

		inputPledge.forEach(e => {
			e.classList.remove('clicked');
		});

		!pledgeBtn[i].classList.contains('first')
			? ((pledgeBtn[i].nextElementSibling.textContent = ' '),
			  (pledge[i - 1].value = pledgeArray[i - 1]))
			: '';
	});
}

// | ADD CLICKED TO LI
for (let i = 0; i < catHead.length; i++) {
	catHead[i].addEventListener('click', () => {
		radio[i].parentElement.parentElement.classList.contains('clicked')
			? radio[i].parentElement.parentElement.classList.remove('clicked')
			: radio.forEach(e => {
					e.parentElement.parentElement.classList.remove('clicked');
					radio[i].parentElement.parentElement.classList.add('clicked');
			  });

		inputPledge.forEach(e => {
			e.classList.remove('clicked');
		});

		!pledgeBtn[i].classList.contains('first')
			? ((pledgeBtn[i].nextElementSibling.textContent = ' '),
			  (pledge[i - 1].value = pledgeArray[i - 1]))
			: '';
	});
}

// | BOOKMARK THE PAGE
bookmark.addEventListener('click', () => {
	bookmark.checked
		? (bookPara.textContent = 'Bookmarked')
		: (bookPara.textContent = 'Bookmark');
});
